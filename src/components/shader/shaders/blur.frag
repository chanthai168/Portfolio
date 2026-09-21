precision mediump float;

uniform sampler2D uTexture;
uniform vec2 uResolution;

varying vec2 vUv; // if your vertex shader outputs uv; otherwise use gl_FragCoord

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    vec2 texel = 1.0 / uResolution;

    float weights[5];
    weights[0] = 0.227027;
    weights[1] = 0.1945946;
    weights[2] = 0.1216216;
    weights[3] = 0.054054;
    weights[4] = 0.016216;

    vec4 result = texture2D(uTexture, uv) * weights[0];

    for (int i = 1; i < 5; i++) {
        vec2 offset = vec2(texel.x * float(i) * 1.5, 0.0);
        result += texture2D(uTexture, uv + offset) * weights[i];
        result += texture2D(uTexture, uv - offset) * weights[i];
    }

    gl_FragColor = result;
}