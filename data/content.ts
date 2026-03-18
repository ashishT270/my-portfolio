export type RichBlock =
  | { type: "text"; value: string }
  | { type: "heading"; value: string }
  | { type: "subheading"; value: string }
  | { type: "list"; items: string[] }
  | { type: "diagram"; title: string; lines: string[] }
  | { type: "note"; value: string };

export const content = {
  tech: [
    {
      title: "Understanding AOSP HAL",
      desc: "Beginner guide to HAL layers",
      slug: "aosp-hal",
      content: [
        "The Hardware Abstraction Layer (HAL) acts as a bridge between Android framework and device hardware.",
        "It allows Android to remain device-independent while still interacting with specific hardware components.",
        "Each hardware component like audio, camera, or sensors has its own HAL implementation.",
        "Understanding HAL helps in debugging, customization, and working deeply with AOSP systems."
      ],
      richContent: [
        {
          type: "text" as const,
          value: "The Hardware Abstraction Layer (HAL) is one of the most important architectural components in Android. It acts as a bridge between the Android framework and device-specific hardware — allowing Android to be truly device-independent regardless of manufacturer."
        },
        {
          type: "text" as const,
          value: "Without HAL, every Android version update would require hardware manufacturers to rewrite their drivers from scratch. HAL solves this by defining a standard interface contract that both sides agree to follow."
        },
        {
          type: "heading" as const,
          value: "Where HAL Fits in Android Architecture"
        },
        {
          type: "diagram" as const,
          title: "Android Layered Architecture",
          lines: [
            "┌──────────────────────────────────────┐",
            "│           Android App                │",
            "│   (Camera App, Music Player, etc.)   │",
            "└──────────────────┬───────────────────┘",
            "                   │  Java / Kotlin API calls",
            "┌──────────────────▼───────────────────┐",
            "│         Android Framework            │",
            "│   CameraManager   AudioManager       │",
            "│   SensorManager   LocationManager    │",
            "└──────────────────┬───────────────────┘",
            "                   │  JNI / Binder IPC",
            "┌──────────────────▼───────────────────┐",
            "│   Hardware Abstraction Layer (HAL)   │",
            "│  camera.hal  audio.hal  sensors.hal  │",
            "│       gps.hal      bluetooth.hal     │",
            "└──────────────────┬───────────────────┘",
            "                   │  ioctl / mmap",
            "┌──────────────────▼───────────────────┐",
            "│            Linux Kernel              │",
            "│          (Device Drivers)            │",
            "└──────────────────┬───────────────────┘",
            "                   │",
            "┌──────────────────▼───────────────────┐",
            "│          Physical Hardware           │",
            "│   Image Sensor   DSP   Audio Codec   │",
            "└──────────────────────────────────────┘"
          ]
        },
        {
          type: "heading" as const,
          value: "What Exactly is a HAL?"
        },
        {
          type: "text" as const,
          value: "A HAL is a shared library (.so file) that implements a standard interface defined by AOSP. The Android framework calls into the HAL using that interface, and the HAL in turn communicates with the hardware driver inside the Linux kernel."
        },
        {
          type: "text" as const,
          value: "Think of HAL as a power socket standard. Your device (plug) and the wall (framework) don't need to know each other's internals — they just agree on the socket shape (interface). Different manufacturers can build different plugs as long as they fit the same socket."
        },
        {
          type: "heading" as const,
          value: "Types of HAL"
        },
        {
          type: "list" as const,
          items: [
            "Legacy HAL — older .so libraries loaded directly by the framework (pre-Android 8)",
            "Binderized HAL (HIDL) — introduced in Android 8 Oreo; runs in a separate process, communicating via Binder IPC for better stability and security",
            "AIDL HAL — introduced in Android 11; uses AIDL instead of HIDL, simpler syntax and better tooling",
            "Passthrough HAL — a hybrid mode where HIDL wraps a legacy HAL, used for easier migration"
          ]
        },
        {
          type: "heading" as const,
          value: "HAL Interface: HIDL and AIDL"
        },
        {
          type: "text" as const,
          value: "Modern Android uses HIDL (HAL Interface Definition Language) or AIDL to define the interface contract between the framework and HAL. These IDL files are compiled into stubs that both sides use — the framework never links directly against HAL code."
        },
        {
          type: "diagram" as const,
          title: "How the Framework Talks to HAL",
          lines: [
            "  Android Framework",
            "        │",
            "        │  calls standard interface",
            "        ▼",
            "  ┌─────────────────────┐",
            "  │   HAL Interface     │  ← defined by AOSP (HIDL / AIDL)",
            "  │  ICameraProvider    │",
            "  └──────────┬──────────┘",
            "             │  implemented by OEM / manufacturer",
            "             ▼",
            "  ┌─────────────────────┐",
            "  │  HAL Implementation │  ← vendor's .so library",
            "  │   (e.g. QCamera)    │",
            "  └──────────┬──────────┘",
            "             │  ioctl calls",
            "             ▼",
            "  ┌─────────────────────┐",
            "  │   Kernel Driver     │  ← camera driver in Linux kernel",
            "  └─────────────────────┘"
          ]
        },
        {
          type: "heading" as const,
          value: "Step-by-Step: A Camera HAL Call"
        },
        {
          type: "list" as const,
          items: [
            "1. App calls camera.open() via the Android Framework's CameraManager API",
            "2. Framework talks to CameraService (system service) over Binder",
            "3. CameraService calls into the Camera HAL via the ICameraProvider HIDL interface",
            "4. The HAL implementation (written by the device manufacturer) receives the call",
            "5. HAL sends ioctl commands to the camera kernel driver",
            "6. Driver controls the physical image sensor on the device",
            "7. Captured frame travels back up the same chain to the app"
          ]
        },
        {
          type: "heading" as const,
          value: "Why HAL Matters"
        },
        {
          type: "text" as const,
          value: "HAL enables Android's Project Treble (Android 8+) — the initiative that separates vendor code from the Android OS. This means Google can push Android framework updates without waiting for OEMs to update their drivers, drastically reducing Android fragmentation."
        },
        {
          type: "note" as const,
          value: "Tip: When debugging hardware issues in AOSP, start at the HAL layer using logcat tags like 'CameraHAL', 'AudioHAL' etc. Most hardware-related bugs live right at the HAL — HIDL interface mismatches, missing implementations, or incorrect ioctl parameters."
        }
      ] as RichBlock[]
    }
  ],
 
  poetry: [
    {
      title: "Unclothed",
      slug: "unclothed",
      content: [
        "Ever seen yourself, truly naked?",
        "A body without fabric,",
        "a soul without armor",
        "That’s us isn’t it?",
        "Unwrapped, unguarded, unmasked.",
 
        "",
        "Clothes cover our skin;",
        "Manners cover our mind.",
        "The self we show is stitched",
        "and tailored",
        "The self we hide is bare and trembling.",
 
        "",
        "Beneath all layers, we walk unseen",
        "naked in thought,",
        "naked in truth, naked in spirit."
      ]
    },
    {
      title: "Terrace Musings",
      slug: "terrace-musings",
      content: [
        "A stroll on the terrace as the day grows dim,",
        "Crows convene in a twilight hymn.",
        "Bats emerge with silent grace,",
        "Performing their rites in the open space.",
 
        "",
        "Lazy feet that skip the street,",
        "Find in rooftops a quiet retreat.",
        "Paperflowers sway in pink and white,",
        "Basking in the fading light.",
 
        "",
        "A place to pause, to look within,",
        "To trace where thoughts and dreams have been.",
        "For though we chase who we hope to be,",
        "Life molds us with quiet unpredictability.",
 
        "",
        "Above the noise, above the race,",
        "The terrace holds a healing space.",
        "No grand escape, no grander scheme",
        "Just peace, perspective, and a drifting dream."
      ]
    }
  ],
 
  creative: [
    {
      title: "",
      image: "/mountain.jfif"
    },
    {
      title: "",
      image: "/flower.jfif"
    },
    {
      title: "",
      image: "/river.jfif"
    },
    {
      title: "",
      image: "/monkey.jfif"
    },
    {
      title: "",
      image: "/birds.jfif"
    }
  ],
 
  creativeBlog: {
    title: "Finding Life in Nature",
    content: [
      "There are moments when life and death feel confusing, almost overwhelming.",
      "In such times, turning towards nature brings a quiet clarity that words often fail to provide.",
      "We, as human beings, have slowly distanced ourselves from nature in pursuit of progress and technology.",
      "But when we step closer, we witness something profound life growing and withering every moment.",
      "A flower blooms and fades, rivers flow endlessly, mountains stand still yet change with time.",
      "Nature silently teaches us the truth of existence that everything is temporary, yet meaningful.",
      "It reminds us that we too are part of this cycle, not separate from it.",
      "Technology has made our lives easier, but it has also pulled us away from this connection.",
      "The balance lies in embracing both evolving with technology while staying rooted in nature.",
      "Because in the end, acceptance comes not from control, but from understanding our place in this world."
    ]
  }
};