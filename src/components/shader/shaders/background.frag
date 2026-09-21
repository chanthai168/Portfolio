precision mediump float;

uniform vec2 uResolution;

uniform float uTime;


// square wave
// void main() {
//     vec2 uv = gl_FragCoord.xy / uResolution;

//     float wave = sin((uv.y + uv.x) * 2.0 + uTime * 0.5 );

//     float brightness = 0.8 + wave * 0.2;

//     gl_FragColor = vec4(
//         brightness ,
//         brightness ,
//         brightness * 0.2,
//         1.0
//     );
// }

//circular wave 

void main() {
    // Correct aspect ratio so waves stay circular, not stretched
    vec2 uv = (gl_FragCoord.xy - 1.0 * uResolution.xy) / uResolution.y;

    // Wave radiates outward from center over time
    float dist = length(uv);
    float wave = cos(dist * 2.0 - uTime * 1.0);

    float brightness = 0.8 + wave * 0.2;

    gl_FragColor = vec4(
        brightness * 0.1,
        brightness * 0.6,
        brightness ,
        0.5
    );
}