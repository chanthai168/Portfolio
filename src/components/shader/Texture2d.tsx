
import { useEffect, useRef } from "react";

import textureSrc from '../../assets/flower.png';

import {
  createProgram,
  resizeCanvas,
  createTexture
} from "./Shader.js";

import vertexShaderSource from "./shaders/background.vert?raw";
import fragmentShaderSource from "./shaders/texture2dv2.frag?raw";

export default function TextureShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mouse = {
    x: 0.5,
    y: 0.5,
    };

  // get mouse position from actual canvas 
  function handleMouseMove(event: MouseEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = (event.clientX - rect.left) / rect.width;
    mouse.y = 1.0 - (event.clientY - rect.top) / rect.height;
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const gl = canvas.getContext("webgl");

    if (!gl) {
      console.error("WebGL is not supported");
      return;
    }

    const program = createProgram(
      gl,
      vertexShaderSource,
      fragmentShaderSource
    );

    gl.useProgram(program);

    const image = new Image();

    image.src = textureSrc;

    // --------------------------------
    // Geometry
    // --------------------------------

    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,

      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();

    if (!buffer) {
      throw new Error("Failed to create buffer");
    }

    gl.bindBuffer(
      gl.ARRAY_BUFFER,
      buffer
    );

    gl.bufferData(
      gl.ARRAY_BUFFER,
      positions,
      gl.STATIC_DRAW
    );

    const positionLocation =
      gl.getAttribLocation(
        program,
        "aPosition"
      );

    gl.enableVertexAttribArray(
      positionLocation
    );

    gl.vertexAttribPointer(
      positionLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0
    );

    // --------------------------------
    // Uniforms
    // --------------------------------

    const resolutionLocation =
      gl.getUniformLocation(
        program,
        "uResolution"
      );

    const timeLocation = 
      gl.getUniformLocation(
        program,
        "uTime"
      )

    const mouseLocation = 
      gl.getUniformLocation(
        program,
        "uMouse"
      );

    const textureLocation =
        gl.getUniformLocation(
        program,
        "uTexture"
    );

    image.onload = () => {
        const texture = createTexture(
            gl,
            image
        );

        gl.useProgram(program);

        // Tell uTexture to use texture unit 0
        gl.uniform1i(
            textureLocation,
            0
        );

        function render(time: number){
            resizeCanvas(canvas!, gl!);

            gl!.useProgram(program);

            gl!.uniform2f(
                resolutionLocation,
                canvas!.width,
                canvas!.height
            );

            gl!.uniform1f(
                timeLocation,
                time * 0.001
            )

            gl!.uniform2f(
                mouseLocation,
                mouse.x * canvas!.width,
                mouse.y * canvas!.height
            );

            // -----------------------------
            // Texture
            // -----------------------------

            gl!.activeTexture(
                gl!.TEXTURE0
            );

            gl!.bindTexture(
                gl!.TEXTURE_2D,
                texture
            );

            // -----------------------------
            // Draw
            // -----------------------------

            gl!.drawArrays(
            gl!.TRIANGLES,
            0,
            6
            );

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }

    window.addEventListener("mousemove",handleMouseMove);

    // --------------------------------
    // Cleanup
    // --------------------------------

    return () => {
      window.removeEventListener("mousemove",handleMouseMove);

      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let currentY = 0;
    let targetY = 0;
    let rafId: number;

    const speed = -0.2;          // parallax strength (0.3–0.5 is nice)
    const lag = 0.08;           // ← lower = more delay / heavier feel
                                //   0.05–0.12 is a good range

    const onScroll = () => {
      targetY = window.scrollY * speed;
    };

    const animate = () => {
      // Smoothly catch up to the target
      currentY += (targetY - currentY) * lag;

      // Optional: stop micro-movements when very close
      if (Math.abs(targetY - currentY) < 0.1) {
        currentY = targetY;
      }

      wrapper.style.transform = `translate3d(0, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();          // set initial target
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);


  return (
    <div
      ref={wrapperRef}
      className=" fixed inset-0 -z-10 h-full w-full will-change-transform"
      style={{ transform: "translate3d(0, 0, 0)" }} // initial
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />
    </div>
  );
}