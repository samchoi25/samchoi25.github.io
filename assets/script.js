(function () {
  "use strict";

  var FILES = {
    "about.txt": "Senior frontend engineer with 15+ years building production web applications in JavaScript, TypeScript, and React, including eight years across Apple's online store. Ships interfaces on top of ML and LLM systems — owned the frontend for Apple's ML-powered product recommendations and built LLM-driven customer workflows at MODE — and works daily in agentic development tooling, including Playwright MCP servers and spec-driven prompting. Known for raising codebase quality through architecture, testing, performance, and accessibility.",

    "skills.txt": "Core: JavaScript (ES6+), TypeScript, React, Redux, Node.js\nAI-Assisted Dev: Claude, Playwright MCP servers, spec-driven prompting, playbooks\nUI & Design Systems: Shared component libraries, Material UI, Tailwind CSS, Sass, WCAG accessibility\nTesting & Quality: Playwright, Jest, Cypress, code review, technical documentation, TDD\nData & APIs: REST/JSON, WebSockets, instrumentation and product analytics, MySQL, MongoDB\nBuild & Infra: Vite, Webpack, Git, Jenkins, Linux/Bash, Splunk",

    "experience.log": "MODE, Inc. — San Mateo, CA\nSenior Software Engineer (UI) | March 2024 – Aug 2026\n\n- Owned individual projects end to end as one of three engineers driving UI and UX for BizConsole, MODE's flagship product — visualizing live sensor data from construction sites and factories for 24 enterprise customers.\n- Built charting and geospatial features for the data visualization layer in TypeScript, Vite, Material UI, and Tailwind CSS, rendering large sensor datasets into user-facing dashboards.\n- Shipped a Google Maps React interface for sensor tracking and status alerting, including a client-side authoring tool for geofences and marker points, with alerts triggered by sensor thresholds or geofence breach.\n- Stood up an end-to-end testing platform covering both UI and backend API services, then led team-wide adoption using Playwright MCP servers, playbooks, and spec-driven prompts — reaching 85% code coverage.\n- Formalized an improved release process for a growing engineering team, focused on developer ease of use and eliminating single points of failure.\n- Ran code reviews, accessibility reviews, and peer mentorship across the frontend team.\n- Integrated LLM-powered features into customer workflows across Slack, Teams, and Direct, letting operators act on sensor alerts inside the tools they already used.\n- Instrumented dashboard interactions and used the resulting product data to prioritize feature work and retire unused surfaces.\n- Worked cross-functionally with Design, Backend, and Product counterparts in Japan, translating ambiguous requirements into shippable technical designs.\n\nApple Online Store — Sunnyvale, CA\nFront End UI Engineer [Red Oak Technologies Contract] | March 2020 – September 2023\n\n- Migrated Apple Watch, iPad, and Mac flagship product pages from a legacy stack to React, Redux, TypeScript, Node, and Sass — cutting page weight 30% and improving browser performance 25%.\n- Owned end-to-end UI for Shop By Availability, an ML-powered product recommendation experience across the Apple Watch, iPhone, and iPad lines: consumed model output for display and instrumented user interactions back to the ML models via API.\n- Led the Apple Watch product page redesign from wireframes, coordinating 5–7 frontend engineers on a globally distributed cross-functional team.\n- Contributed reusable components — date pickers, alert banners, navigation elements — to Apple's company-wide component library.\n- Owned Apple Watch Design Studio and Apple Watch Bands: new UI features, accessibility compliance, and production bug support.\n- Audited and remediated web accessibility defects across Apple Store domains.\n- Built Node.js testing and build scripts for CI/CD and non-production pipelines with Jenkins and Splunk.\n- Maintained shared repositories through code review, documentation, working local demos, and versioned NPM releases.\n\nWilliams-Sonoma — San Francisco, CA\nFront End Engineer [TekSystems Contract] | September 2019 – March 2020\n\n- Built customer-facing Gift Registry and Product Information Page features in TypeScript and React, scaled across six e-commerce domains.\n- Migrated a legacy Backbone.js codebase to a Vue.js and Node.js stack.\n- Raised test coverage 30% with Jest and set code quality standards for the frontend team.\n- Modernized legacy UI components to meet current web accessibility standards.\n- Presented UI demos to executive leadership.\n\nApple Online Store — Sunnyvale, CA\nFront End UI Engineer [TekSystems Contract] | March 2015 – September 2019\n\n- Delivered production frontend features across iPad, Apple Watch, Accessories, Checkout, Refurbished Products, and iPhone Trade-in.\n- Implemented the initial React, TypeScript, Redux, Node, and Sass stack from wireframes and optimized Webpack builds.\n- Modernized legacy CanJS components onto an internal ES6 framework and migrated legacy CSS to SCSS.\n- Improved code quality and test coverage with Jasmine, and reviewed pull requests across shared group repositories.\n\n— Earlier Experience —\n\nOne Kings Lane — Software Engineer, San Francisco, CA | 2011 – 2014\nMigrated a legacy PHP e-commerce codebase to Ruby on Rails. Built customer referral, loyalty shipping, and promo code redemption features, and maintained the shopping cart and checkout API for the iOS app.\n\nExygy Web Apps — Web Developer, San Francisco, CA | 2009 – 2011\nBuilt custom WordPress solutions and developed client web applications on the CodeIgniter and CakePHP frameworks.",

    "education.txt": "B.S. Computer Science\nUniversity of California, Santa Barbara",

    "contact.txt": "location: San Francisco, CA\nlinkedin: linkedin.com/in/samuel-choi-61ab7830\ngithub: github.com/samchoi25"
  };

  var FILE_NAMES = Object.keys(FILES);
  var WHOAMI = "Sam Choi\nSenior Frontend Engineer\nSan Francisco, CA";
  var CD_TARGETS = ["grid"];
  var LESS_LIMIT = 150;

  // Chips shown while the prompt is empty. Commands taking a param fill with a
  // trailing space so Tab completion can pick up from there.
  var COMMANDS = [
    { label: "whoami", fill: "whoami" },
    { label: "ls", fill: "ls" },
    { label: "cat", fill: "cat " },
    { label: "more", fill: "more " },
    { label: "less", fill: "less " },
    { label: "cd", fill: "cd " },
    { label: "clear", fill: "clear" }
  ];

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var output = document.getElementById("output");
  var input = document.getElementById("term-input");
  var body = document.getElementById("terminal-body");
  var announcer = document.getElementById("sr-announcer");
  var chips = document.getElementById("chips");

  var busy = false;
  var lastTabTime = 0;
  var lastTabValue = "";

  var history = [];
  var historyIndex = 0;
  var draft = "";

  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  function renderChips() {
    COMMANDS.forEach(function (entry) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = entry.label;
      chip.addEventListener("click", function () {
        input.value = entry.fill;
        input.focus();
        setCaretEnd();
        refreshChips();
      });
      chips.appendChild(chip);
    });
  }

  function refreshChips() {
    chips.hidden = busy || input.value.length > 0;
  }

  function setCaretEnd() {
    var len = input.value.length;
    try {
      input.setSelectionRange(len, len);
    } catch (err) {
      /* input types without selection support */
    }
  }

  function linkify(el, text) {
    var re = /(linkedin\.com\S*|github\.com\S*)/g;
    var lastIndex = 0;
    var match;
    var frag = document.createDocumentFragment();

    while ((match = re.exec(text)) !== null) {
      if (match.index > lastIndex) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }
      var a = document.createElement("a");
      a.href = "https://" + match[0];
      a.textContent = match[0];
      a.target = "_blank";
      a.rel = "noopener";
      frag.appendChild(a);
      lastIndex = re.lastIndex;
    }
    if (lastIndex < text.length) {
      frag.appendChild(document.createTextNode(text.slice(lastIndex)));
    }
    el.textContent = "";
    el.appendChild(frag);
  }

  function typeInto(el, text, onDone, linkifyAfter) {
    if (reduceMotion) {
      if (linkifyAfter) linkify(el, text); else el.textContent = text;
      if (onDone) onDone();
      return;
    }

    el.textContent = "";
    el.classList.add("is-typing");
    var totalMs = Math.min(1400, Math.max(300, text.length * 6));
    var start = null;

    function step(timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min(1, (timestamp - start) / totalMs);
      var chars = Math.floor(progress * text.length);
      el.textContent = text.slice(0, chars);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.remove("is-typing");
        if (linkifyAfter) linkify(el, text); else el.textContent = text;
        if (onDone) onDone();
      }
      scrollToBottom();
    }

    requestAnimationFrame(step);
  }

  function echo(commandText) {
    var line = document.createElement("p");
    line.className = "prompt";
    line.innerHTML =
      'visitor@sc5:~$ <span class="cmd"></span>';
    line.querySelector(".cmd").textContent = commandText;
    output.appendChild(line);
  }

  function printInstant(text) {
    var pre = document.createElement("pre");
    pre.className = "output";
    pre.textContent = text;
    output.appendChild(pre);
    scrollToBottom();
  }

  function printAnimated(text, linkifyAfter) {
    var pre = document.createElement("pre");
    pre.className = "output";
    output.appendChild(pre);
    busy = true;
    input.disabled = true;
    refreshChips();
    typeInto(
      pre,
      text,
      function () {
        busy = false;
        input.disabled = false;
        input.focus();
        announcer.textContent = text;
        refreshChips();
      },
      linkifyAfter
    );
  }

  // Renders filenames as chips that run `cat <file>` when clicked. They stay
  // live in the scrollback, so an older `ls` remains usable.
  function printFileChips(names) {
    var row = document.createElement("div");
    row.className = "chips chips-inline";
    output.appendChild(row);

    busy = true;
    input.disabled = true;
    refreshChips();

    var i = 0;

    function finish() {
      busy = false;
      input.disabled = false;
      input.focus();
      announcer.textContent = names.join(", ");
      refreshChips();
    }

    function addNext() {
      if (i >= names.length) {
        finish();
        return;
      }

      var name = names[i++];
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = name;
      chip.addEventListener("click", function () {
        if (busy) return;
        input.value = "";
        runCommand("cat " + name);
        refreshChips();
      });
      row.appendChild(chip);
      scrollToBottom();

      if (reduceMotion) {
        addNext();
      } else {
        setTimeout(addNext, 70);
      }
    }

    addNext();
  }

  function notFound(cmd, arg) {
    printAnimated(cmd + ": " + arg + ": No such file or directory");
  }

  function runCommand(raw) {
    var trimmed = raw.trim();
    echo(trimmed);

    if (trimmed) {
      history.push(trimmed);
    }
    historyIndex = history.length;
    draft = "";

    if (!trimmed) {
      return;
    }

    var parts = trimmed.split(/\s+/);
    var cmd = parts[0];
    var arg = parts[1];

    switch (cmd) {
      case "whoami":
        printAnimated(WHOAMI);
        break;

      case "ls":
        printFileChips(FILE_NAMES);
        break;

      case "clear":
        // Wipes the screen only — command history survives.
        output.innerHTML = "";
        window.scrollTo(0, 0);
        break;

      case "cat":
      case "more":
      case "less":
        if (!arg) {
          printAnimated("usage: " + cmd + " <file>");
        } else if (!FILES.hasOwnProperty(arg)) {
          notFound(cmd, arg);
        } else {
          var content = FILES[arg];
          if (cmd === "less" && content.length > LESS_LIMIT) {
            content = content.slice(0, LESS_LIMIT) + "…";
          }
          printAnimated(content, arg === "contact.txt");
        }
        break;

      case "cd":
        if (!arg) {
          // no-op, like returning to home
        } else if (arg === "grid") {
          printAnimated("→ grid.html", false);
          busy = true;
          input.disabled = true;
          setTimeout(function () {
            window.location.href = "grid.html";
          }, 700);
        } else {
          printAnimated("cd: no such file or directory: " + arg);
        }
        break;

      default:
        printAnimated("zsh: command not found: " + cmd);
    }
  }

  function completionCandidates(value) {
    var parts = value.split(/\s+/);
    var cmd = parts[0];
    var partial = parts.length > 1 ? parts[parts.length - 1] : "";

    if (["cat", "more", "less"].indexOf(cmd) !== -1 && parts.length >= 1) {
      return FILE_NAMES.filter(function (f) {
        return f.indexOf(partial) === 0;
      });
    }
    if (cmd === "cd" && parts.length >= 1) {
      return CD_TARGETS.filter(function (t) {
        return t.indexOf(partial) === 0;
      });
    }
    return [];
  }

  function handleTab(e) {
    e.preventDefault();
    var value = input.value;
    var candidates = completionCandidates(value);

    if (candidates.length === 0) {
      return;
    }

    if (candidates.length === 1) {
      var parts = value.split(/\s+/);
      parts[parts.length - 1] = candidates[0];
      input.value = parts.join(" ") + " ";
      lastTabTime = 0;
      return;
    }

    var now = Date.now();
    if (now - lastTabTime < 600 && lastTabValue === value) {
      printInstant(candidates.join("   "));
      lastTabTime = 0;
    } else {
      lastTabTime = now;
      lastTabValue = value;
    }
  }

  input.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      handleTab(e);
      refreshChips();
    } else if (e.key === "Enter") {
      if (busy) return;
      var value = input.value;
      input.value = "";
      runCommand(value);
      refreshChips();
    } else if (e.key === "ArrowUp") {
      if (busy || history.length === 0) return;
      e.preventDefault();
      if (historyIndex === history.length) draft = input.value;
      if (historyIndex > 0) historyIndex--;
      input.value = history[historyIndex];
      setCaretEnd();
      refreshChips();
    } else if (e.key === "ArrowDown") {
      if (busy || historyIndex === history.length) return;
      e.preventDefault();
      historyIndex++;
      input.value =
        historyIndex === history.length ? draft : history[historyIndex];
      setCaretEnd();
      refreshChips();
    }
  });

  input.addEventListener("input", refreshChips);

  body.addEventListener("click", function (e) {
    if (!busy && !e.target.closest(".chip")) input.focus();
  });

  renderChips();
  refreshChips();
  input.focus();
  echo("whoami");
  history.push("whoami");
  historyIndex = history.length;
  printAnimated(WHOAMI);
})();
