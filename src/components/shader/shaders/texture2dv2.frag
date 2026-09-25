// Use highp when the device actually supports it in fragment shaders,
// fall back to mediump otherwise (this define is auto-set by WebGL).
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;

// Force high precision here specifically — this is the function that
// breaks first on mediump (the sin() trick needs range/precision that
// mediump on most mobile GPUs doesn't reliably give you).
highp float random(vec2 position) {
    highp float x = dot(position, vec2(12.9898, 78.233));
    return fract(sin(x) * 43758.5453123);
}

float noise(vec2 position) {
    vec2 grid = floor(position);
    vec2 local = fract(position);

    vec2 smoothLocal = local * local * (3.0 - 2.0 * local);

    float a = random(grid);
    float b = random(grid + vec2(1.0, 0.0));
    float c = random(grid + vec2(0.0, 1.0));
    float d = random(grid + vec2(1.0, 1.0));

    float top = mix(a, b, smoothLocal.x);
    float bottom = mix(c, d, smoothLocal.x);

    return mix(top, bottom, smoothLocal.y);
}

// 3 octaves instead of 5 — this only drives a small UV distortion,
// so the extra detail from octaves 4-5 is basically invisible in the
// final image but was costing ~40% of the noise budget.
float fbm(vec2 position) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 3; i++) {
        value += noise(position * frequency) * amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 mouseUv = uMouse / uResolution;

    vec2 distortion = vec2(
        fbm(uv * 0.2 + uTime * 0.1),
        fbm(uv * 2.0 + vec2(5.2, 1.3) + uTime * 0.1)
    );

    vec2 distortedUV = uv + (distortion - 0.5) * 0.2;

    vec2 mouseOffset = uv - mouseUv;
    float mouseDistance = length(mouseOffset);
    float mouseInfluence = 1.0 - smoothstep(0.0, 0.2, mouseDistance);

    uv = distortedUV;
    uv += mouseOffset * mouseInfluence * 0.1;

    float scale = 0.3;
    uv = (uv - 0.5) / scale + 0.5;
    uv.y = -uv.y + 1.0;

    gl_FragColor = texture2D(uTexture, uv);
}