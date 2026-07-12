# Agent 3: WebGL/WebGPU Expert

## Context

The site should use graphics work as proof, but keep the archive list as the stable primary experience. Graphics features need progressive enhancement, reduced-motion support, and mobile performance caps.

## Feature Ideas

| Feature | User value | Fit for site | Technical implementation | Cost | Display effect | Risk |
|---|---|---|---|---|---|---|
| WebGPU Graphics Lab | Directly proves graphics engineering capability. | Current site states engine direction but lacks proof. | Dedicated page with WebGPU demos, WebGL2/Canvas fallback, FPS/controls. | Medium-high | Real-time particles, flow fields, post-processing. | Compatibility and performance. |
| Interactive Shader Notes | Turns learning notes into executable articles. | Blog can host technical learning content. | `<canvas data-shader-demo>` enhancer loading shader presets. | Medium | Shader demos embedded in posts. | Must isolate code from main `script.js`. |
| SmartLabeling Visualizer | Connects AI project with graphics overlays. | SmartLabeling is a listed project. | Local images/masks, WebGL/WebGPU overlay, class highlighting. | Medium | Compare original, AI mask, corrected result. | Needs high-quality sample assets. |
| Engine Roadmap 3D Timeline | Explains Java-to-engine path visually. | Personal archive has strong timeline potential. | Lightweight WebGL/Three.js or custom WebGL timeline from JSON. | Medium | Draggable technical route nodes. | Can become too flashy for the archive tone. |
| Compute Particle Identity Card | Memorable first-screen graphics signal. | Adds a strong but small engine/WebGPU cue. | Small WebGPU compute/render canvas; static fallback. | Medium | Particles form identity/engine words with pointer interaction. | First-screen cost and motion sensitivity. |
| GPU Capability Inspector | Shows real-world compatibility thinking. | Static technical tool page fits GitHub Pages. | Detect WebGPU/WebGL2 support, limits, texture size, copyable report. | Low-medium | Browser GPU capability matrix. | Privacy limits adapter details. |
| Local GPU Image Processing Bench | Demonstrates GPU compute and tool UX. | Connects graphics with AI/image tooling. | Upload local image, apply shaders/filters, show timing, download result. | Medium | Before/after image workbench. | Memory issues with large images. |
| Archive Constellation Map | Makes content exploration distinctive. | `posts/posts.json` can drive nodes. | WebGL/SVG nodes by tag/year; click to article. | Medium | Alternate archive star map. | Few posts may make the graph sparse. |

## Recommended Priority

1. SmartLabeling Visualizer
2. WebGPU Graphics Lab
3. Interactive Shader Notes

