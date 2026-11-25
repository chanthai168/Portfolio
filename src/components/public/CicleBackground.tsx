import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { Mesh, ShaderMaterial, Group } from 'three'

/* ------------------------------------------------------------------ */
/*  Shaders                                                            */
/* ------------------------------------------------------------------ */

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uSpin;

  attribute vec4  aOrbit;   // x: radius, y: start angle, z: height, w: base size
  attribute vec3  aColor;
  attribute float aSeed;

  varying vec3 vColor;

  void main() {
    float radius = aOrbit.x;
    float height = aOrbit.z;
    float base   = aOrbit.w;

    float omega = uSpin / (0.35 + radius * 0.6);
    float angle = aOrbit.y + uTime * omega;

    vec3 pos = vec3(cos(angle) * radius, height, sin(angle) * radius);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    float twinkle = 0.8 + 0.2 * sin(uTime * 1.8 + aSeed * 6.2831853);

    gl_PointSize = max(1.0, base * uSize * uPixelRatio * (320.0 / -mv.z) * twinkle);
    vColor = aColor * twinkle;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d2 = dot(uv, uv);
    if (d2 > 0.25) discard;
    float glow = 1.0 - d2 * 4.0;
    glow *= glow;
    gl_FragColor = vec4(vColor * glow, glow);
  }
`

/* ------------------------------------------------------------------ */
/*  Galaxy generator                                                   */
/* ------------------------------------------------------------------ */

function gaussian() {
  let u = 0, v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function buildAndromeda(count: number) {
  const positions = new Float32Array(count * 3)
  const orbits    = new Float32Array(count * 4)
  const colors    = new Float32Array(count * 3)
  const seeds     = new Float32Array(count)

  const DISK_RADIUS = 5.6
  const BULGE_RADIUS = 1.15
  const BULGE_FRACTION = 0.24
  const ARMS = 2
  const ARM_TIGHTNESS = 3.6
  const ARM_SCATTER = 0.34
  const FIELD_STAR_FRACTION = 0.28

  const bulgeCount = Math.floor(count * BULGE_FRACTION)

  const coreColor = new THREE.Color('#ffd49a')
  const midColor  = new THREE.Color('#fff0d8')
  const armColor  = new THREE.Color('#a6ccff')
  const hiiColor  = new THREE.Color('#ff86c8')
  const tmp = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const isBulge = i < bulgeCount
    let radius: number, angle: number, height: number, size: number

    if (isBulge) {
      radius = BULGE_RADIUS * Math.pow(Math.random(), 1.35)
      angle  = Math.random() * Math.PI * 2
      height = gaussian() * radius * 0.55
      size   = 0.05 + Math.random() * 0.06
      tmp.copy(coreColor).lerp(midColor, Math.random() * 0.7)
    } else {
      const r = Math.max(0.3, DISK_RADIUS * Math.pow(Math.random(), 0.62))
      const isFieldStar = Math.random() < FIELD_STAR_FRACTION
      let theta: number
      if (isFieldStar) {
        theta = Math.random() * Math.PI * 2
      } else {
        const arm = Math.floor(Math.random() * ARMS)
        const armOffset = (arm / ARMS) * Math.PI * 2
        const spiral = Math.log(r / 0.45) * ARM_TIGHTNESS
        theta = armOffset + spiral + gaussian() * ARM_SCATTER
      }
      radius = r
      angle  = theta
      height = gaussian() * 0.055 * (1 + r * 0.25)
      height += Math.sin(r * 0.85) * 0.22 * Math.pow(r / DISK_RADIUS, 3)
      size   = 0.028 + Math.random() * 0.045

      const t = THREE.MathUtils.smoothstep(r / DISK_RADIUS, 0.02, 0.9)
      tmp.copy(coreColor).lerp(midColor, Math.min(1, t * 2)).lerp(armColor, Math.max(0, t - 0.4) / 0.6)

      if (!isFieldStar && Math.random() < 0.03) {
        tmp.lerp(hiiColor, 0.85)
        size *= 1.6
      }
    }

    const brightness = 0.45 + Math.random() * 0.65
    tmp.multiplyScalar(brightness)

    positions[i * 3]     = Math.cos(angle) * radius
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = Math.sin(angle) * radius

    orbits[i * 4]     = radius
    orbits[i * 4 + 1] = angle
    orbits[i * 4 + 2] = height
    orbits[i * 4 + 3] = size

    colors[i * 3]     = tmp.r
    colors[i * 3 + 1] = tmp.g
    colors[i * 3 + 2] = tmp.b

    seeds[i] = Math.random()
  }

  return { positions, orbits, colors, seeds }
}

/* ------------------------------------------------------------------ */
/*  Galaxy                                                             */
/* ------------------------------------------------------------------ */

function Galaxy({ count = 12000, spin = 0.3 }: { count?: number; spin?: number }) {
  const matRef = useRef<ShaderMaterial>(null)
  const { positions, orbits, colors, seeds } = useMemo(() => buildAndromeda(count), [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 1 },
      uPixelRatio: { value: 1 },
      uSpin: { value: spin },
    }),
    [spin]
  )

  useFrame((state) => {
    const m = matRef.current
    if (!m) return
    m.uniforms.uTime.value = state.clock.getElapsedTime()
    m.uniforms.uPixelRatio.value = state.gl.getPixelRatio()
  })

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aOrbit"  args={[orbits, 4]} />
        <bufferAttribute attach="attributes-aColor"  args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSeed"   args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Soft nucleus glow                                                  */
/* ------------------------------------------------------------------ */

function CoreGlow() {
  const ref = useRef<Mesh>(null)
  const uniforms = useMemo(() => ({ uColor: { value: new THREE.Color('#ffcf8a') } }), [])
  useFrame(({ camera }) => { ref.current?.quaternion.copy(camera.quaternion) })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[4.5, 4.5]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `}
        fragmentShader={/* glsl */ `
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float d = length(vUv - 0.5) * 2.0;
            float g = pow(max(0.0, 1.0 - d), 3.0);
            gl_FragColor = vec4(uColor, g * 0.5);
          }
        `}
      />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Scroll-driven camera rig                                           */
/* ------------------------------------------------------------------ */

type Ref<T> = { current: T }

function CameraRig({ progressRef, smoothRef }: {
  progressRef: Ref<number>
  smoothRef: Ref<number>
}) {
  useFrame((state, delta) => {
    // Smooth toward the target scroll progress
    const target = progressRef.current
    smoothRef.current += (target - smoothRef.current) * Math.min(1, delta * 3.5)
    const t = smoothRef.current

    // Spherical: radius + phi (angle from +Y axis)
    const startRadius = 9.2
    const endRadius   = 6.5
    const startPhi    = 1.2       // ~68.8° from vertical → angled, flat view
    const endPhi      = 0.06      // ~3.4°  from vertical → top-down view

    const radius = startRadius + (endRadius - startRadius) * t
    const phi    = startPhi    + (endPhi    - startPhi)    * t

    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi)

    state.camera.position.set(0, y, z)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

/* ------------------------------------------------------------------ */
/*  Group tilt — eases back to 0 so the top view shows a true circle   */
/* ------------------------------------------------------------------ */

function GalaxyGroup({ smoothRef, children }: {
  smoothRef: Ref<number>
  children: React.ReactNode
}) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (!ref.current) return
    const targetRoll = -0.12 * (1 - smoothRef.current)
    ref.current.rotation.z = THREE.MathUtils.damp(
      ref.current.rotation.z, targetRoll, 3, delta
    )
  })
  return <group ref={ref} rotation={[0, 0, -0.12]}>{children}</group>
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

export default function UnstoppableBackground() {
  const progressRef = useRef(0)
  const smoothRef   = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = maxScroll > 0
        ? Math.min(1, Math.max(0, scrollTop / maxScroll))
        : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        background: '#050810',
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 3.33, 8.58], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['#050810']} />
        <CameraRig progressRef={progressRef} smoothRef={smoothRef} />
        <GalaxyGroup smoothRef={smoothRef}>
          <Galaxy count={12000} spin={0.3} />
          <CoreGlow />
        </GalaxyGroup>
      </Canvas>
    </div>
  )
}