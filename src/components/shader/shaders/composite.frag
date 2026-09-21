precision mediump float;

uniform sampler2D uSharp;   // FBO A — original scene
uniform sampler2D uBlurH;   // FBO B — horizontally blurred
uniform vec2 uResolution;
uniform vec3 uGlowColor;
uniform float uGlowIntensity;
uniform float uSpread;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 texel = 1.0 / uResolution;

    float weights[5];
    weights[0] = 0.227027;
    weights[1] = 0.1945946;
    weights[2] = 0.1216216;
    weights[3] = 0.054054;
    weights[4] = 0.016216;

    // vertical blur pass, reading from the already horizontally-blurred FBO
    vec4 blurred = texture2D(uBlurH, uv) * weights[0];
    for (int i = 1; i < 5; i++) {
        vec2 offset = vec2(0.0, texel.y * float(i) * uSpread);
        blurred += texture2D(uBlurH, uv + offset) * weights[i];
        blurred += texture2D(uBlurH, uv - offset) * weights[i];
    }

    vec4 sharp = texture2D(uSharp, uv);

    // glow = blurred alpha bleeding outward where the sharp shape is absent
    float glowStrength = blurred.a * (1.0 - sharp.a) * uGlowIntensity ;

    vec3 finalRGB = sharp.rgb + uGlowColor * glowStrength;
    float finalAlpha = max(sharp.a, blurred.a);

    gl_FragColor = vec4(finalRGB, finalAlpha);
}