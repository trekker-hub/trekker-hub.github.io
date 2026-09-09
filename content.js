/* ============================================================================
   content.js  —  THIS IS THE ONLY FILE YOU NEED TO EDIT.

   Everything you see on the website comes from this file.
   Change the text between the "quotes" and save. That's it.

   Three rules that will save you every time:
     1. Every line inside a { } block ends with a comma ,
     2. Text always goes inside "double quotes"
     3. If you want an apostrophe inside text, it's fine: "I'm here"
        But if you need a double quote inside text, write it as \"like this\"

   If the site ever goes blank after an edit, you broke rule 1 or 2.
   Open the page, press F12, click "Console", and it will tell you the line.

   Full instructions are in README.md
   ========================================================================== */

const SITE = {

  /* ---------------------------------------------------------------------
     1. WHO YOU ARE  —  shows in the header and the top of the page
     ------------------------------------------------------------------- */
  profile: {
    name: "Tariq Aldalou",
    initials: "TA",
    role: "Computer Engineer",
    location: "Northern Virginia, USA",

    // The big sentence under your name on the homepage.
    tagline: "I work at the layer where firmware meets silicon — FPGA fabric, embedded sensor pipelines, and formal proofs that the firmware does what the spec says.",

    // Small line under that. Keep it factual.
    subline: "B.S. Computer Engineering, George Mason (2026) · M.S. ECE, Georgia Tech (Fall 2026) · Open to computer engineering roles.",

    // The little light in the top-right corner.
    // status can be: "open" (green), "busy" (amber), or "off" (grey)
    status: "open",
    statusText: "Open to work",
  },

  /* ---------------------------------------------------------------------
     2. LINKS  —  leave any of these as "" (empty) to hide the button
     ------------------------------------------------------------------- */
  links: {
    email: "tarekdalo1234@gmail.com",
    github: "https://github.com/trekker-hub",
    linkedin: "",           // <- paste your full LinkedIn URL here
    resume: "resume.pdf",   // the PDF sitting next to this file
    phone: "",              // leave empty unless you want it public
  },

  /* ---------------------------------------------------------------------
     3. THE TIMING DIAGRAM  —  the graphic at the top of the page.

     Each "channel" is one line on the diagram. Each channel can have
     several "segments" (the raised blocks). Dates are "YYYY-MM".
     Use "now" as an end date for anything still going.

     Add a channel by copying a whole { ... } block and pasting it below.
     Up to 6 channels get their own colour automatically.
     ------------------------------------------------------------------- */
  timeline: {
    startYear: 2022,
    endYear: 2029,
    channels: [
      {
        name: "SCHOOL",
        segments: [
          { label: "NOVA · A.S.",        start: "2022-08", end: "2024-05" },
          { label: "GMU · B.S. CpE",     start: "2024-08", end: "2026-05" },
          { label: "Georgia Tech · M.S.", start: "2026-08", end: "2029-05" },
        ],
      },
      {
        name: "TEACHING",
        segments: [
          { label: "Engineering instructor · Fairfax County", start: "2024-04", end: "now" },
        ],
      },
      {
        name: "LABS",
        segments: [
          { label: "Fermilab · Quantum", start: "2025-06", end: "2025-09" },
          { label: "AVATAR · GMU",       start: "2026-05", end: "now" },
        ],
      },
      {
        name: "BUILDS",
        segments: [
          { label: "DriveGuard",  start: "2025-08", end: "2025-12" },
          { label: "CubeSat FPGA", start: "2025-08", end: "2026-05" },
          { label: "Home lab",    start: "2025-01", end: "now" },
        ],
      },
    ],
  },

  /* ---------------------------------------------------------------------
     4. ABOUT  —  one "..." per paragraph, separated by commas
     ------------------------------------------------------------------- */
  about: [
    "I design and verify systems that have to keep working when nobody is around to restart them. Most of what I do sits on the boundary between hardware and software: RTL on Artix-7 fabric, C and C++ on bare-metal microcontrollers, and Ada/SPARK contracts that let a compiler prove a driver can't overflow a buffer before it ever reaches a board.",

    "I finished a B.S. in Computer Engineering at George Mason in Spring 2026 with a 3.95 GPA, after two associate degrees at NOVA. My senior project — an open-source CubeSat FPGA payload built with formal verification — won the ECE department's first-place design award. In Fall 2026 I start Georgia Tech's online M.S. in Electrical and Computer Engineering.",

    "Right now I'm on the AVATAR research program at GMU, building the wearable biometric pipeline for a VR addiction-recovery platform. I also teach a weekly engineering class for high schoolers at a Fairfax County community center. Explaining a concept to a sixteen-year-old is the fastest way I've found to discover I don't actually understand it.",
  ],

  // Four short facts shown beside the About text. Add or remove freely.
  facts: [
    { k: "Based in",    v: "Clifton, Virginia" },
    { k: "Work status", v: "U.S. permanent resident" },
    { k: "Focus",       v: "FPGA · Embedded · Formal methods" },
    { k: "Off-hours",   v: "Camping, air shows, RC planes" },
  ],

  /* ---------------------------------------------------------------------
     5. PROJECTS

     "id"      : short name, no spaces. Used in the web address.
     "detail"  : true  = gets its own page (project.html?id=...)
                 false = just shows on the homepage
     "image"   : "images/whatever.jpg" — or leave "" for a placeholder
     "links"   : add as many as you like, or leave the list empty: []
     "blocks"  : the content of the detail page. See README.md for the
                 five block types you can use.
     ------------------------------------------------------------------- */
  projects: [

    {
      id: "cubesat",
      title: "CubeSat FPGA Development Platform",
      summary: "An Artix-7 payload platform with Ada/SPARK communication drivers and a completed PCB design. First place in the GMU ECE senior design competition.",
      subtitle: "Formally verified payload computer for a 1U satellite",
      period: "Fall 2025 – Spring 2026",
      status: "Design complete",
      featured: true,
      detail: true,
      image: "images/cubesat/cubesat.png",
      blurb: "An open-source FPGA payload platform for CubeSat missions: a three-layer PCB carrying an Artix-7, its own power distribution and thermal monitoring, and firmware written in Ada/SPARK so the compiler proves the communication drivers correct before anything is flashed. Won first place in the GMU ECE senior design competition.",
      tags: ["VHDL", "Ada/SPARK", "Artix-7", "PCB design", "Formal verification", "I2C / SPI / UART"],
      links: [
        { label: "GitHub", url: "https://github.com/trekker-hub/Spark-1U-Cubesat" },
      ],
      blocks: [
        { h: "The problem" },
        { p: "A CubeSat in orbit cannot be reached with a debugger. Once the firmware is on the board and the board is on a rocket, every bug you did not find is permanent. University CubeSat teams typically write their flight firmware in C and test it by running it — which finds the bugs you thought to test for and none of the others." },
        { p: "The goal of this project was a hardware platform that other student teams could actually build on, paired with firmware written so that correctness is proven rather than sampled." },

        { h: "What I built" },
        { list: [
          "A three-layer PCB integrating a Xilinx Artix-7 FPGA (Basys 3 class), power management, and modular sensor interfaces.",
          "The complete power distribution layer: regulation, protection against reverse polarity and overcurrent, and on-board temperature monitoring for thermal margin during vacuum testing.",
          "Formally verified I2C and SPI communication libraries in Ada/SPARK, with preconditions and postconditions that GNATprove discharges statically.",
          "A modified UART register interface and bootloader path so firmware can be uploaded to the board without a JTAG programmer, developed in collaboration with engineers at AdaCore.",
        ]},

        { h: "Why Ada/SPARK" },
        { p: "SPARK is a subset of Ada with a proof tool attached. You write contracts — this pointer is never null, this index stays inside the array, this buffer is written before it is read — and the prover either discharges them or shows you the exact path where they fail. It shifts the work forward: you spend longer stating what you mean, and you stop spending time on a category of bug entirely." },
        { p: "The side effect I did not expect was on the design itself. Being forced to write down invariants before writing logic produced a cleaner interface than I would have arrived at by iterating on C." },

        { h: "Result" },
        { p: "The PCB design is complete and ready for fabrication and stress testing. The project took first place in the George Mason ECE senior design competition in 2026 and is being carried forward as a shared platform for university-wide Ada/SPARK firmware work." },

        { img: "images/cubesat/cubesat-pcb.png", caption: "Power-regulation PCB design for the FPGA and sensors, showing the communication buses in 2D and 3D." },
      ],
    },

    {
      id: "avatar",
      title: "AVATAR — Wearable Biometric Pipeline",
      summary: "Wearable sensing for a VR research platform. A Galaxy Watch application captures physiological signals for a continuous biometric pipeline.",
      subtitle: "Physiological sensing for a VR addiction-recovery platform",
      period: "May 2026 – present",
      status: "Active research",
      featured: true,
      detail: true,
      image: "images/avatar/pipeline.svg",
      imageAlt: "AVATAR pipeline: Galaxy Watch sensor capture, on-watch recording, and signal processing.",
      blurb: "AVATAR (Adaptive Virtual Assistant for Therapeutic Auto-Regulation) is a multidisciplinary GMU research program spanning computer engineering, bioengineering, and game design. I build the wearable side: continuous physiological capture on a Samsung Galaxy Watch, and the signal pipeline that turns it into a live signal the VR environment can respond to.",
      tags: ["Wear OS", "Kotlin", "Samsung Health Sensor SDK", "Signal processing", "Empatica", "Android services"],
      links: [
        { label: "Watch app", url: "https://github.com/trekker-hub/AVATAR-Samsung-Watch" },
        { label: "Empatica pipeline", url: "https://github.com/trekker-hub/AVATAR-Empatica-Pipeline", hidden: true },
      ],
      blocks: [
        { h: "What the program is trying to do" },
        { p: "AVATAR places someone in recovery inside a VR environment that can recognise the physiological signature of a craving or stress response and intervene in the moment — a breathing cue, a change in the scene, a grounding prompt — before the person consciously registers what is happening. The engineering requirement is a body-worn sensor stream that is continuous, timestamped, and reliable enough to drive that decision." },

        { h: "My part" },
        { list: [
          "Wear OS application for the Samsung Galaxy Watch that records heart rate, PPG, accelerometer and skin-temperature channels through the Samsung Health Sensor SDK.",
          "A foreground service architecture that keeps sensor acquisition alive through screen-off, doze mode and app backgrounding — the part that actually decides whether a wearable study produces usable data.",
          "Session recording, on-watch buffering, and export to the analysis pipeline with consistent timestamps across devices.",
          "A parallel ingestion pipeline for Empatica research-grade wristband data, so watch-derived signals can be validated against a clinical reference.",
        ]},

        { h: "Where it is now" },
        { p: "The recording application runs reliably through multi-hour sessions. Current work is on the signal-processing stage: extracting heart-rate variability features from the raw PPG stream and defining the thresholds the VR side listens for." },
      ],
    },

    {
      id: "driveguard",
      title: "DriveGuard",
      subtitle: "IoT driver-safety monitor",
      period: "Fall 2025",
      status: "Complete",
      featured: false,
      detail: true,
      image: "",
      blurb: "An embedded system that watches how a car is actually being driven — speed, harsh acceleration, cornering — and raises an alert over MQTT in under two seconds. Built on an Arduino Nano 33 IoT with a BN220 GPS and an LSM6DS3 IMU, with ten minutes of local buffering so a dropped connection doesn't mean lost data.",
      tags: ["C++", "Arduino Nano 33 IoT", "GPS", "IMU", "MQTT", "PCB design"],
      links: [
        { label: "GitHub", url: "https://github.com/trekker-hub/DriveGuard_IoT_System" },
      ],
      blocks: [
        { h: "Overview" },
        { p: "DriveGuard fuses GPS ground speed with six-axis inertial data to classify unsafe driving events: sustained speeding, hard braking, aggressive acceleration and sharp cornering. Events are published over MQTT to a subscriber — a fleet dashboard, a parent's phone — with sub-two-second latency from event to alert." },

        { h: "Engineering notes" },
        { list: [
          "Firmware in C++ on an Arduino Nano 33 IoT, reading a BN220 GPS module over UART and an LSM6DS3 IMU over I2C.",
          "A rolling local buffer holding ten minutes of sensor readings, so cellular or Wi-Fi dropouts degrade the transport rather than the record.",
          "Event classification runs on-device: raw sensor data never has to leave the vehicle for the alert to fire.",
          "Complete hardware integration — sensor wiring, power management, and a PCB layout ready for fabrication.",
        ]},

        { h: "The constraint that shaped it" },
        { p: "The alert is only useful if it arrives while the driver can still act on it. That single latency budget drove every other decision: classification on the microcontroller instead of in a cloud function, MQTT instead of HTTP, and a buffer that never blocks the sensing loop." },
      ],
    },

    {
      id: "quantum",
      title: "Quantum Circuits on Superconducting Hardware",
      subtitle: "Fermilab Theory Division",
      period: "June 2025 – September 2025",
      status: "Complete",
      featured: false,
      detail: true,
      image: "",
      blurb: "A summer in Fermilab's Theory Division under Dr. Hank Lamm and Dr. Roni Harnik, building quantum circuits in Qiskit and running them on IBM's four-qubit superconducting machines — then measuring how far the real hardware drifts from the ideal simulation.",
      tags: ["Qiskit", "Python", "IBM Quantum", "Quantum gates", "Complexity analysis"],
      links: [],
      blocks: [
        { h: "What I worked on" },
        { p: "I came in knowing digital logic and left knowing why quantum logic is a different animal. The work covered quantum gates and coupling, circuit construction in Qiskit, and the practical business of getting a circuit to run on real superconducting hardware rather than a simulator." },

        { h: "Simulation versus silicon" },
        { p: "The interesting part was the gap. A circuit that produces a clean distribution in simulation produces something noticeably messier on a four-qubit machine — decoherence, gate error, readout error. Characterising that gap, and reasoning about which algorithms retain their complexity advantage once you pay for it, was the substance of the summer." },

        { h: "What I took from it" },
        { p: "Fermilab is an environment where nobody rounds a number to make a result look better. That standard was worth more to me than the quantum computing itself." },
      ],
    },

    {
      id: "homelab",
      title: "Self-Hosted AI and Automation Lab",
      subtitle: "Personal infrastructure",
      period: "2025 – present",
      status: "Ongoing",
      featured: false,
      detail: true,
      image: "",
      blurb: "An Ubuntu server running Docker, a local Llama 3.1 deployment on CUDA, and an n8n pipeline that reads job postings, filters them with the local model, files the good ones into Notion and pings me on Discord. Built partly to job-hunt faster and partly because renting three containers by the month felt like a bad trade.",
      tags: ["Ubuntu Server", "Docker", "Ollama", "CUDA", "n8n", "Notion API", "Raspberry Pi CM4", "Coral Edge TPU"],
      links: [
        { label: "GitHub", url: "https://github.com/trekker-hub/laptop-home-server" },
      ],
      blocks: [
        { h: "The stack" },
        { list: [
          "Ubuntu Server host running containerised services under Docker.",
          "Ollama serving Llama 3.1 locally with CUDA acceleration — no per-token cost, no data leaving the house.",
          "An n8n workflow that pulls job listings, passes each through the local model for relevance scoring, writes matches into a Notion database and sends a Discord notification.",
          "A Raspberry Pi CM4 with a Google Coral Edge TPU for edge-inference experiments.",
        ]},
        { h: "Why bother" },
        { p: "Two reasons. The obvious one is that a filtered feed of relevant postings beats scrolling job boards. The less obvious one is that running the whole chain yourself — GPU drivers, container networking, model quantisation, webhook plumbing — teaches you where the real cost of a system lives. It is not in the model." },
      ],
    },

  ],

  /* ---------------------------------------------------------------------
     6. EXPERIENCE  —  newest first
     ------------------------------------------------------------------- */
  experience: [
    {
      role: "Research Intern",
      org: "AVATAR Research Program, George Mason University",
      place: "Fairfax, VA",
      period: "May 2026 – present",
      points: [
        "Contributing to AVATAR (Adaptive Virtual Assistant for Therapeutic Auto-Regulation), a multidisciplinary program combining computer engineering, bioengineering and game design into a VR and wearable biometric platform supporting addiction recovery.",
        "Building the wearable sensing and signal-processing pipeline that captures physiological data to anticipate relapse-trigger states and deliver real-time recovery cues inside the VR environment.",
      ],
    },
    {
      role: "Quantum Computing Research Intern",
      org: "Fermi National Accelerator Laboratory — Theory Division",
      place: "Batavia, IL",
      period: "June 2025 – September 2025",
      points: [
        "Quantum computing research under Dr. Hank Lamm and Dr. Roni Harnik covering quantum gates, coupling, and circuit programming in Python with the Qiskit SDK.",
        "Ran experiments on IBM four-qubit superconducting quantum computers, comparing classical simulation against real hardware and analysing where the complexity advantage survives contact with noise.",
      ],
    },
    {
      role: "Engineering Program Instructor",
      org: "Fairfax County Community Center",
      place: "Fairfax, VA",
      period: "April 2024 – present",
      points: [
        "Designed and taught a hands-on engineering curriculum for 12+ high school students across multiple three-month cohorts, covering circuit design, Arduino programming and microcontroller fundamentals; roughly a quarter have gone on to pursue engineering.",
        "Built interactive STEM projects spanning electronics theory, embedded programming and hardware prototyping, mentoring students through debugging and design decisions rather than handing them answers.",
      ],
    },
  ],

  /* ---------------------------------------------------------------------
     7. EDUCATION
     ------------------------------------------------------------------- */
  education: [
    {
      school: "Georgia Institute of Technology",
      place: "Atlanta, GA (online)",
      degree: "M.S. Electrical and Computer Engineering",
      period: "Fall 2026 – Spring 2029 (expected)",
      detail: "",
    },
    {
      school: "George Mason University",
      place: "Fairfax, VA",
      degree: "B.S. Computer Engineering",
      period: "2024 – 2026",
      detail: "GPA 3.95 · Dean's List Fall 2024, Spring 2025, Fall 2025 · NVTC and ADVANCED scholarships",
    },
    {
      school: "Northern Virginia Community College",
      place: "Fairfax, VA",
      degree: "A.S. Engineering, and A.S. Science & Mathematics",
      period: "2022 – 2024",
      detail: "GPA 3.90 · Presidential Scholar Spring 2023, Fall 2023 · Dean's List Fall 2022, Spring 2024 · FAITH and Kimmy Duong scholarships",
    },
  ],

  // Courses worth naming. Keep it short — this is a signal, not a transcript.
  coursework: [
    "Computer Architecture (RISC-V, CPU/GPU/FPGA design)",
    "RTL Design (VHDL)",
    "Embedded Systems",
    "Internet of Things",
    "Ada/SPARK and Formal Verification",
    "System Architecture Design",
    "Microcontrollers (MSP430)",
    "Operating Systems",
    "Signals and Systems",
    "Data Structures",
    "Linear Electronics",
  ],

  /* ---------------------------------------------------------------------
     8. SKILLS  —  grouped. Add a group by copying a whole { } block.
     ------------------------------------------------------------------- */
  skills: [
    {
      group: "Digital design & FPGA",
      items: ["VHDL", "SystemVerilog", "Xilinx Vivado", "Artix-7 / Basys 3", "RTL design", "RISC-V", "Computer architecture"],
    },
    {
      group: "Embedded systems",
      items: ["C", "C++", "Arduino", "ESP32", "MSP430", "ARM Cortex-M", "Raspberry Pi / CM4", "Wear OS", "SPI", "I2C", "UART", "2.4 GHz RF", "GPS & IMU sensors"],
    },
    {
      group: "Formal methods & safety",
      items: ["Ada/SPARK", "GNATprove", "Contract-based design", "Safety-critical firmware"],
    },
    {
      group: "Languages",
      items: ["Python", "C", "C++", "Java", "Rust", "Kotlin", "VHDL", "Ada", "Bash", "Assembly (MIPS, x86, ARM)"],
    },
    {
      group: "Systems & tooling",
      items: ["Linux (Ubuntu Server)", "Docker", "Git / GitHub", "MQTT", "CUDA", "Ollama", "n8n", "Notion API"],
    },
    {
      group: "Quantum computing",
      items: ["Qiskit", "IBM Quantum Composer", "Circuit design", "Complexity analysis"],
    },
    {
      group: "Hardware & fabrication",
      items: ["PCB design", "Power distribution", "Fusion 360", "3D printing", "Additive manufacturing", "Soldering & bring-up"],
    },
  ],

  /* ---------------------------------------------------------------------
     9. AWARDS  —  newest first
     ------------------------------------------------------------------- */
  awards: [
    { year: "2026", title: "1st Place, ECE Senior Design Project Award", org: "George Mason University — Open-Source CubeSat Payload" },
    { year: "2026", title: "Outstanding Academic Award, Electrical & Computer Engineering", org: "George Mason University" },
    { year: "2025", title: "NVTC Scholarship", org: "Northern Virginia Technology Council" },
    { year: "2024", title: "7th Place National · 1st Place Virginia State, Additive Manufacturing", org: "SkillsUSA" },
    { year: "2023", title: "NOVA Design Challenge Winner", org: "Northern Virginia Community College" },
    { year: "2022", title: "Fairfax Peace Award", org: "Fairfax County" },
    { year: "2022", title: "Laura Ashley Piper Award", org: "Northern Virginia Community College" },
  ],

  /* ---------------------------------------------------------------------
     10. WHAT'S NEXT  —  short, honest, three or four items
     ------------------------------------------------------------------- */
  next: [
    {
      when: "Now",
      title: "Looking for a computer engineering role",
      body: "Open to FPGA, embedded, firmware and hardware-adjacent software work. Northern Virginia or remote. U.S. permanent resident, no sponsorship needed.",
    },
    {
      when: "Fall 2026",
      title: "Georgia Tech, M.S. ECE",
      body: "Starting the online M.S. in Electrical and Computer Engineering, concentrating on computer architecture and hardware systems, alongside full-time work.",
    },
    {
      when: "Ongoing",
      title: "AVATAR and the teaching program",
      body: "Continuing the wearable biometric pipeline at GMU, and running the weekly engineering cohort for high schoolers.",
    },
  ],

  /* ---------------------------------------------------------------------
     11. FOOTER
     ------------------------------------------------------------------- */
  footer: {
    note: "Built and maintained by hand. Hosted on GitHub Pages.",
  },

};
