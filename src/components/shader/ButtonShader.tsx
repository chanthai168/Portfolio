
import { useEffect, useRef } from "react";

import {
  createProgram,
  resizeCanvas,
} from "./Shader.js";

import vertexShaderSource from "./shaders/background.vert?raw";
import fragmentShaderSource from "./shaders/mouseInteractionBG.frag?raw";

export default function ButtonShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // --------------------------------
    // Render
    // --------------------------------

    function render(time: number) {
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

        gl!.drawArrays(
            gl!.TRIANGLES,
            0,
            6
        );
        requestAnimationFrame(render)
    }

    // Initial render
    requestAnimationFrame(render)


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

  return (
    <canvas
      ref={canvasRef}
      className=" block -z-10 h-full w-full"
    />
  );
}