import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { DRAG_SETTLE_DURATION_MS, dragSettleKeyframes } from "./interface-motion.ts";

test("page reorder spring uses stiffness 1200 and damping 80 without overshoot", () => {
  for (const distance of [-720, -32, 0, 32, 720]) {
    const frames = dragSettleKeyframes(distance);
    assert.equal(frames[0].transform, `translateY(${distance}px)`);
    assert.equal(frames.at(-1).transform, "translateY(0px)");
    assert.equal(frames[0].offset, 0);
    assert.equal(frames.at(-1).offset, 1);
    let previous = Math.abs(distance);
    for (const frame of frames) {
      const displacement = Number(frame.transform.match(/translateY\(([^p]+)px\)/)[1]);
      assert.ok(Math.abs(displacement) <= previous);
      if (distance !== 0) assert.ok(displacement / distance >= 0);
      const seconds = frame.offset * DRAG_SETTLE_DURATION_MS / 1000;
      if (frame.offset < 1) {
        const expected = distance * (1.5 * Math.exp(-20 * seconds) - 0.5 * Math.exp(-60 * seconds));
        assert.ok(Math.abs(displacement - expected) < 1e-10);
      }
      previous = Math.abs(displacement);
    }
  }
});

test("shared interface styles and the standalone gate avoid pure black and unadjusted weights", () => {
  const paths = [
    "../app/globals.css",
    "../components/TripPresentation.module.css",
    "../components/ImageLightbox.module.css",
    "../../../scripts/microsoft-auth-template.html",
  ];
  for (const path of paths) {
    const source = readFileSync(new URL(path, import.meta.url), "utf8");
    assert.doesNotMatch(source, /#000(?:000)?\b|rgba?\(\s*0[,\s]+0[,\s]+0[,\s)]|\b(?:color|background):\s*black\b/i, path);
    assert.doesNotMatch(source, /font-weight:\s*\d|font:\s*[3-8]\d{2}\s/, path);
  }
});
