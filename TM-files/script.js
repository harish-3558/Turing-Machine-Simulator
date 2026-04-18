

/* ══════════════════ MACHINE DEFINITIONS ══════════════════ */
const MACHINES = {
  "even-ones": {
    name: "Even Number of 1s",
    desc: "Accepts binary strings with an even count of 1s (including zero). Uses parity tracking.",
    states: ["q0","q1","qA","qR"],
    start: "q0", accept: ["qA"], reject: ["qR"], blank: "B",
    alphabet: ["0","1","B"],
    examples: ["1 1","0 0 0","1 0 1 0 1","1 1 0 0"],
    transitions: {
      "q0,0":["q0","0","R"], "q0,1":["q1","1","R"], "q0,B":["qA","B","R"],
      "q1,0":["q1","0","R"], "q1,1":["q0","1","R"], "q1,B":["qR","B","R"]
    },
    layout: {
      q0:{ x:100,y:140 }, q1:{ x:260,y:140 },
      qA:{ x:180,y:270 }, qR:{ x:340,y:270 }
    }
  },
  "palindrome": {
    name: "Binary Palindrome",
    desc: "Accepts binary strings that read the same forwards and backwards.",
    states: ["q0","q1","q2","q3","q4","q5","qA","qR"],
    start: "q0", accept: ["qA"], reject: ["qR"], blank: "B",
    alphabet: ["0","1","X","B"],
    examples: ["1 0 1","0 1 1 0","1 0 0","1"],
    transitions: {
      "q0,B":["qA","B","R"],"q0,X":["q0","X","R"],
      "q0,0":["q1","X","R"],"q0,1":["q2","X","R"],
      "q1,0":["q1","0","R"],"q1,1":["q1","1","R"],"q1,X":["q1","X","R"],"q1,B":["q3","B","L"],
      "q2,0":["q2","0","R"],"q2,1":["q2","1","R"],"q2,X":["q2","X","R"],"q2,B":["q4","B","L"],
      "q3,0":["q5","X","L"],"q3,X":["q3","X","L"],"q3,1":["qR","1","R"],"q3,B":["qA","B","R"],
      "q4,1":["q5","X","L"],"q4,X":["q4","X","L"],"q4,0":["qR","0","R"],"q4,B":["qA","B","R"],
      "q5,0":["q5","0","L"],"q5,1":["q5","1","L"],"q5,X":["q5","X","L"],"q5,B":["q0","B","R"]
    },
    layout: {
      q0:{x:80,y:160},q1:{x:220,y:80},q2:{x:220,y:240},
      q3:{x:360,y:80},q4:{x:360,y:240},q5:{x:500,y:160},
      qA:{x:580,y:80},qR:{x:580,y:240}
    }
  },
  "anbn": {
    name: "aⁿbⁿ Language",
    desc: "Accepts strings of the form aⁿbⁿ (equal a's followed by equal b's).",
    states: ["q0","q1","q2","q3","qA","qR"],
    start: "q0", accept: ["qA"], reject: ["qR"], blank: "B",
    alphabet: ["a","b","X","Y","B"],
    examples: ["a a b b","a b","a a a b b b","b"],
    transitions: {
      "q0,X":["q0","X","R"],"q0,a":["q1","X","R"],"q0,Y":["q3","Y","R"],"q0,B":["qR","B","R"],
      "q1,a":["q1","a","R"],"q1,Y":["q1","Y","R"],"q1,b":["q2","Y","L"],"q1,B":["qR","B","R"],
      "q2,a":["q2","a","L"],"q2,Y":["q2","Y","L"],"q2,X":["q0","X","R"],
      "q3,Y":["q3","Y","R"],"q3,B":["qA","B","R"],"q3,b":["qR","b","R"]
    },
    layout: {
      q0:{x:80,y:160},q1:{x:240,y:80},q2:{x:400,y:160},
      q3:{x:240,y:240},qA:{x:400,y:300},qR:{x:560,y:160}
    }
  },
  "increment": {
    name: "Binary Increment",
    desc: "Increments a binary number by 1 via carry propagation from the right.",
    states: ["q0","q1","qA"],
    start: "q0", accept: ["qA"], reject: [], blank: "B",
    alphabet: ["0","1","B"],
    examples: ["1 0 1","0 1 1","1 1 1","0 0 0"],
    transitions: {
      "q0,0":["q0","0","R"],"q0,1":["q0","1","R"],"q0,B":["q1","B","L"],
      "q1,1":["q1","0","L"],"q1,0":["qA","1","R"],"q1,B":["qA","1","R"]
    },
    layout: { q0:{x:100,y:160}, q1:{x:280,y:160}, qA:{x:460,y:160} }
  },

  "wcwr": {
    name: "wcwᴿ Recognizer",
    desc: "Accepts strings of the form wcwᴿ over {a,b}. w is any word, # is the separator, and wᴿ is w reversed. Example: ab#ba.",
    states: ["q0","q1a","q1b","q2a","q2b","q3","q4","qA","qR"],
    start: "q0", accept: ["qA"], reject: ["qR"], blank: "B",
    alphabet: ["a","b","#","X","Y","B"],
    examples: ["a b # b a","a b b # b b a","a # a","a b # a b"],
    transitions: {
      "q0,X":["q0","X","R"],
      "q0,a":["q1a","X","R"],
      "q0,b":["q1b","X","R"],
      "q0,#":["q3","#","R"],
      "q1a,a":["q1a","a","R"],"q1a,b":["q1a","b","R"],
      "q1a,#":["q1a","#","R"],"q1a,X":["q1a","X","R"],"q1a,Y":["q1a","Y","R"],
      "q1a,B":["q2a","B","L"],
      "q1b,a":["q1b","a","R"],"q1b,b":["q1b","b","R"],
      "q1b,#":["q1b","#","R"],"q1b,X":["q1b","X","R"],"q1b,Y":["q1b","Y","R"],
      "q1b,B":["q2b","B","L"],
      "q2a,Y":["q2a","Y","L"],"q2a,a":["q4","Y","L"],"q2a,b":["qR","b","R"],
      "q2a,#":["qR","#","R"],"q2a,B":["qR","B","R"],
      "q2b,Y":["q2b","Y","L"],"q2b,b":["q4","Y","L"],"q2b,a":["qR","a","R"],
      "q2b,#":["qR","#","R"],"q2b,B":["qR","B","R"],
      "q4,a":["q4","a","L"],"q4,b":["q4","b","L"],
      "q4,#":["q4","#","L"],"q4,Y":["q4","Y","L"],
      "q4,X":["q0","X","R"],
      "q3,Y":["q3","Y","R"],"q3,B":["qA","B","R"],"q3,a":["qR","a","R"],"q3,b":["qR","b","R"]
    },
    layout: {
      q0:{x:80,y:200}, q1a:{x:240,y:100}, q1b:{x:240,y:300},
      q2a:{x:400,y:100}, q2b:{x:400,y:300},
      q3:{x:240,y:200}, q4:{x:550,y:200},
      qA:{x:660,y:100}, qR:{x:660,y:300}
    }
  },

  "div3": {
    name: "Binary Divisible by 3",
    desc: "Accepts binary strings representing numbers divisible by 3 (e.g. 0, 11, 110, 1001). Uses 3 parity states.",
    states: ["q0","q1","q2","qA","qR"],
    start: "q0", accept: ["qA"], reject: ["qR"], blank: "B",
    alphabet: ["0","1","B"],
    examples: ["1 1","1 1 0","1 0 0 1","0","1 0 1"],
    transitions: {
      "q0,0":["q0","0","R"],"q0,1":["q1","1","R"],"q0,B":["qA","B","R"],
      "q1,0":["q2","0","R"],"q1,1":["q0","1","R"],"q1,B":["qR","B","R"],
      "q2,0":["q1","0","R"],"q2,1":["q2","1","R"],"q2,B":["qR","B","R"]
    },
    layout: {
      q0:{x:100,y:160}, q1:{x:260,y:80}, q2:{x:260,y:240},
      qA:{x:420,y:100}, qR:{x:420,y:240}
    }
  },

  "equal-ab": {
    name: "Equal a's and b's",
    desc: "Accepts strings over {a,b} with equal numbers of a's and b's (any order). Uses a counter via states.",
    states: ["q0","q1","q2","q3","q4","qA","qR"],
    start: "q0", accept: ["qA"], reject: ["qR"], blank: "B",
    alphabet: ["a","b","X","B"],
    examples: ["a b","b a","a b b a","a a b b","a b a"],
    transitions: {
      "q0,a":["q1","X","R"],"q0,b":["q2","X","R"],
      "q0,X":["q0","X","R"],"q0,B":["qA","B","R"],
      "q1,a":["q1","a","R"],"q1,b":["q3","X","L"],"q1,X":["q1","X","R"],"q1,B":["qR","B","R"],
      "q2,b":["q2","b","R"],"q2,a":["q4","X","L"],"q2,X":["q2","X","R"],"q2,B":["qR","B","R"],
      "q3,a":["q3","a","L"],"q3,b":["q3","b","L"],"q3,X":["q0","X","R"],
      "q4,a":["q4","a","L"],"q4,b":["q4","b","L"],"q4,X":["q0","X","R"]
    },
    layout: {
      q0:{x:80,y:180}, q1:{x:240,y:90}, q2:{x:240,y:270},
      q3:{x:420,y:90}, q4:{x:420,y:270},
      qA:{x:500,y:180}, qR:{x:560,y:90}
    }
  },

  "a2nb": {
    name: "a²ⁿbⁿ Language",
    desc: "Accepts strings of the form a²ⁿbⁿ — exactly twice as many a's as b's. Example: aab (n=1), aaaabb (n=2).",
    states: ["q0","q1","q2","q3","q4","qA","qR"],
    start: "q0", accept: ["qA"], reject: ["qR"], blank: "B",
    alphabet: ["a","b","X","Y","B"],
    examples: ["a a b","a a a a b b","a a a a a a b b b","a b","a a a b"],
    transitions: {
      "q0,a":["q1","X","R"],
      "q0,X":["q0","X","R"],
      "q0,Y":["q0","Y","R"],
      "q0,b":["qR","b","R"],
      "q0,B":["q4","B","L"],
      "q1,a":["q2","X","R"],
      "q1,X":["q1","X","R"],
      "q1,Y":["q1","Y","R"],
      "q1,b":["qR","b","R"],
      "q1,B":["qR","B","R"],
      "q2,a":["q2","a","R"],
      "q2,X":["q2","X","R"],
      "q2,Y":["q2","Y","R"],
      "q2,b":["q3","Y","L"],
      "q2,B":["qR","B","R"],
      "q3,a":["q3","a","L"],
      "q3,b":["q3","b","L"],
      "q3,X":["q3","X","L"],
      "q3,Y":["q3","Y","L"],
      "q3,B":["q0","B","R"],
      "q4,X":["q4","X","L"],
      "q4,Y":["q4","Y","L"],
      "q4,b":["qR","b","R"],
      "q4,B":["qA","B","R"]
    },
    layout: {
      q0:{x:80,y:200},  q1:{x:240,y:100}, q2:{x:400,y:100},
      q3:{x:400,y:300}, q4:{x:560,y:200},
      qA:{x:680,y:100}, qR:{x:680,y:300}
    }
  }
};

/* ══════════════════ SIMULATOR STATE ══════════════════ */
let tape=[], headPos=0, curState="", stepCount=0;
let isRunning=false, halted=false, runInterval=null;
let machineKey="even-ones", M=MACHINES[machineKey];
let stepHistory=[];
let visitedStates = new Set(); // tracks all states visited so far

function getDelay(){ const v=+document.getElementById("speed-range").value; return Math.round(1300-v*110); }
function updateSpeedLabel(){ document.getElementById("speed-val").textContent=document.getElementById("speed-range").value+"×"; }

/* ══════════════════ INIT ══════════════════ */
window.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("machine-select").addEventListener("change",e=>{ machineKey=e.target.value; M=MACHINES[machineKey]; onMachineChange(); });
  onMachineChange();
});

function onMachineChange(){
  M=MACHINES[machineKey];
  document.getElementById("machine-desc").textContent=M.desc;
  buildQuickInputs();
  buildTransitionTable();
  drawDiagram(null);
  tmReset();
}

function buildQuickInputs(){
  const c=document.getElementById("quick-inputs");
  c.innerHTML="";
  (M.examples||[]).forEach(ex=>{
    const b=document.createElement("button");
    b.className="qi-btn"; b.textContent=ex;
    b.onclick=()=>{ document.getElementById("tape-input").value=ex; tmReset(); };
    c.appendChild(b);
  });
}

/* ══════════════════ TAPE ══════════════════ */
function parseTape(){
  const raw = document.getElementById("tape-input").value.trim();
  if(!raw) return [M.blank];

  // If user typed with spaces ("1 1 0") split by whitespace
  if(raw.includes(" ") || raw.includes("\t")){
    return raw.split(/\s+/).filter(s => s.length > 0);
  }
  // Otherwise split every character individually ("110" → ["1","1","0"])
  return raw.split("").filter(c => c.trim().length > 0);
}

function ensureBounds(){
  while(headPos<0){ tape.unshift(M.blank); headPos++; }
  while(headPos>=tape.length) tape.push(M.blank);
  if(tape[0]!==M.blank) tape.unshift(M.blank);
  if(tape[tape.length-1]!==M.blank) tape.push(M.blank);
}

function tapeSnapshot(){
  return tape.map((s,i)=> i===headPos ? `[${s===M.blank?"□":s}]` : (s===M.blank?"□":s)).join(" ");
}

function renderTape(){
  const wrap=document.getElementById("tape-wrap");
  wrap.innerHTML="";
  tape.forEach((sym, idx) => {
    const isBlank = sym === M.blank;
    const cell = document.createElement("div");
    cell.className = "tape-cell" + (idx === headPos ? " active" : "") + (isBlank ? " blank" : "");
    const iEl = document.createElement("div");
    iEl.className = "cell-idx";
    iEl.textContent = isBlank ? "□" : idx;   // blank cells show □ instead of index number
    const sEl = document.createElement("div");
    sEl.className = "cell-sym";
    sEl.textContent = isBlank ? "□" : sym;
    cell.appendChild(iEl); cell.appendChild(sEl);
    wrap.appendChild(cell);
  });
  scrollTape();
  positionHead();
}

const CELL_W = 54; // matches CSS width
const CELL_G = 5;  // matches CSS gap
const TAPE_PAD = 20; // matches tape-wrap padding: 0 20px
const CW = CELL_W + CELL_G; // 59px per cell slot

function scrollTape(){
  const vp = document.getElementById("tape-viewport");
  const vpW = vp.clientWidth || 600;
  // Center of the active cell in tape-wrap coordinate space
  const cellCenter = TAPE_PAD + headPos * CW + CELL_W / 2;
  const offset = Math.max(0, cellCenter - vpW / 2);
  document.getElementById("tape-wrap").style.transform = `translateX(${-offset}px)`;
}

function positionHead(){
  const vp  = document.getElementById("tape-viewport");
  const hr  = document.getElementById("head-row");
  const vpW = vp.clientWidth || 600;

  // Center of the active cell in tape-wrap space
  const cellCenter = TAPE_PAD + headPos * CW + CELL_W / 2;
  // How far the tape has scrolled
  const offset = Math.max(0, cellCenter - vpW / 2);
  // Cell center X measured from tape-viewport's left edge
  const cellXInVP = cellCenter - offset;

  // Correct for any horizontal gap between tape-viewport and head-row
  const vpRect = vp.getBoundingClientRect();
  const hrRect = hr.getBoundingClientRect();
  const deltaX = vpRect.left - hrRect.left;

  // Position the 54px-wide indicator so its center sits under cellXInVP
  const tx = deltaX + cellXInVP - CELL_W / 2;
  document.getElementById("head-indicator").style.transform = `translateX(${tx}px)`;
}

/* ══════════════════ STATE UPDATES ══════════════════ */
function updateDisplay(dir){
  const sym=tape[headPos]===M.blank?"□":tape[headPos];
  document.getElementById("disp-state").textContent=curState;
  document.getElementById("disp-sym").textContent=sym;
  document.getElementById("disp-dir").textContent=dir||"—";
  document.getElementById("hstat-steps").textContent=stepCount;
  document.getElementById("hstat-state").textContent=curState;
  document.getElementById("hstat-head").textContent=headPos;
}

/* ══════════════════ RESULT ══════════════════ */
function showResult(type,msg){
  document.getElementById("result-idle").classList.add("hidden");
  document.getElementById("result-accept").classList.add("hidden");
  document.getElementById("result-reject").classList.add("hidden");
  if(type==="accept"){ document.getElementById("accept-sub").textContent=msg||""; document.getElementById("result-accept").classList.remove("hidden"); }
  else if(type==="reject"){ document.getElementById("reject-sub").textContent=msg||""; document.getElementById("result-reject").classList.remove("hidden"); }
  else document.getElementById("result-idle").classList.remove("hidden");
}

/* ══════════════════ TRANSITION TABLE ══════════════════ */
function buildTransitionTable(){
  const head=document.getElementById("trans-thead");
  const body=document.getElementById("trans-tbody");
  const alpha=M.alphabet;

  head.innerHTML=`<th>State</th>`+alpha.map(a=>`<th>${a==="B"?"□":a}</th>`).join("");
  body.innerHTML="";

  M.states.forEach(st=>{
    body.appendChild(buildTransRow(st,alpha));
  });
}

function buildTransRow(st,alpha){
  const tr=document.createElement("tr");
  tr.id=`ttr-${st}`;
  let html=`<td class="td-state">${st}</td>`;
  alpha.forEach(sym=>{
    const k=`${st},${sym}`;
    const t=M.transitions[k];
    const cid=`tcell-${st}-${sym}`;
    if(!t){ html+=`<td id="${cid}" class="td-empty">—</td>`; return; }
    html+=`<td id="${cid}">(${t[0]}, ${t[1]==="B"?"□":t[1]}, ${t[2]})</td>`;
  });
  tr.innerHTML=html;
  return tr;
}

function highlightTransRow(state,sym){
  document.querySelectorAll(".trans-table tr").forEach(r=>r.classList.remove("active-tr"));
  document.querySelectorAll(".trans-table td").forEach(td=>td.style.boxShadow="");
  const cid=`tcell-${state}-${sym}`;
  const cell=document.getElementById(cid);
  if(cell){
    cell.style.boxShadow="inset 0 0 0 2px var(--violet)";
    const row=cell.parentElement;
    if(row) row.classList.add("active-tr");
    // Scroll only within the table container, NOT the page
    const tableWrap = document.querySelector("#card-table .table-wrap");
    if(tableWrap && cell){
      const cellTop = cell.getBoundingClientRect().top;
      const wrapTop = tableWrap.getBoundingClientRect().top;
      tableWrap.scrollTop += (cellTop - wrapTop) - 40;
    }
  }
}

/* ══════════════════ STEP HISTORY ══════════════════ */
function addStepRow(n,state,read,write,move,next,snap){
  const tbody=document.getElementById("step-tbody");
  const empty=tbody.querySelector(".empty-row");
  if(empty) empty.remove();
  const tr=document.createElement("tr");
  tr.innerHTML=`
    <td class="td-num">${n}</td>
    <td class="td-st">${state}</td>
    <td class="td-rd">${read==="B"?"\u25a1":read}</td>
    <td class="td-wr">${write==="B"?"\u25a1":write}</td>
    <td class="td-mv">${move}</td>
    <td class="td-ns">${next}</td>
    <td class="td-tape" title="${snap}">${snap}</td>
  `;
  tbody.appendChild(tr);
  // Scroll ONLY within the table container — never scroll the page
  const wrap = document.querySelector("#card-history .table-wrap");
  if(wrap) wrap.scrollTop = wrap.scrollHeight;
  stepHistory.push({n,state,read,write,move,next,snap});
}

function clearHistory(){
  document.getElementById("step-tbody").innerHTML=`<tr class="empty-row"><td colspan="7">No steps yet — press STEP or RUN</td></tr>`;
  stepHistory=[];
}

/* ══════════════════ CORE STEP ══════════════════ */
function executeStep(){
  if(halted) return;
  const sym=tape[headPos];
  const key=`${curState},${sym}`;
  highlightTransRow(curState,sym);

  const trans=M.transitions[key];
  if(!trans){
    halted=true;
    // No rule = implicit reject unless in accept
    if(M.accept.includes(curState)){
      showResult("accept",`Halted in accept state ${curState} after ${stepCount} steps.`);
    } else {
      showResult("reject",`No transition for (${curState}, ${sym===M.blank?"□":sym}) — rejected after ${stepCount} steps.`);
    }
    setHaltedBtns();
    drawDiagram(curState);
    return;
  }

  const [next,write,dir]=trans;
  visitedStates.add(curState); // mark current state as visited
  addStepRow(stepCount,curState,sym,write,dir,next,tapeSnapshot());

  tape[headPos]=write;
  if(dir==="R") headPos++; else if(dir==="L") headPos--;
  curState=next; stepCount++;
  visitedStates.add(curState); // mark next state too

  ensureBounds();
  renderTape();
  updateDisplay(dir);
  drawDiagram(curState);

  if(M.accept.includes(curState)){
    halted=true;
    showResult("accept",`Reached accept state ${curState} after ${stepCount} steps.`);
    setHaltedBtns(); if(isRunning) tmPause(); return;
  }
  if(M.reject.includes(curState)){
    halted=true;
    showResult("reject",`Reached reject state ${curState} after ${stepCount} steps.`);
    setHaltedBtns(); if(isRunning) tmPause(); return;
  }
}

/* ══════════════════ CONTROLS ══════════════════ */
function tmReset(){
  clearInterval(runInterval); isRunning=false; halted=false; stepCount=0;
  tape = parseTape();
  tape.unshift(M.blank); tape.push(M.blank);
  headPos = 1;
  curState = M.start;
  visitedStates = new Set([M.start]); // reset visited states
  ensureBounds();
  clearHistory(); showResult("idle"); setIdleBtns();
  updateDisplay(null);
  requestAnimationFrame(() => {
    renderTape();
    highlightTransRow(curState, tape[headPos]);
    drawDiagram(curState);
  });
}

function tmStep(){ if(!halted) executeStep(); }

function tmRun(){
  if(halted||isRunning) return;
  isRunning=true;
  document.getElementById("btn-run").disabled=true;
  document.getElementById("btn-step").disabled=true;
  document.getElementById("btn-pause").disabled=false;
  runInterval=setInterval(()=>{ if(halted){tmPause();return;} executeStep(); },getDelay());
}

function tmPause(){
  clearInterval(runInterval); isRunning=false;
  document.getElementById("btn-run").disabled=false;
  document.getElementById("btn-step").disabled=false;
  document.getElementById("btn-pause").disabled=true;
}

function setIdleBtns(){
  document.getElementById("btn-run").disabled=false;
  document.getElementById("btn-step").disabled=false;
  document.getElementById("btn-pause").disabled=true;
  document.getElementById("btn-reset").disabled=false;
}
function setHaltedBtns(){
  document.getElementById("btn-run").disabled=true;
  document.getElementById("btn-step").disabled=true;
  document.getElementById("btn-pause").disabled=true;
  document.getElementById("btn-reset").disabled=false;
}

/* ══════════════════ CANVAS DIAGRAM ══════════════════ */
const STATE_R=36;
const COLORS={
  teal:"#00ffd5", violet:"#c084fc", blue:"#60c8ff",
  green:"#6ee7a0", red:"#ff7070",
  text:"#ffffff", dim:"#7a8aaa"
};

function drawDiagram(activeState){
  const canvas=document.getElementById("tm-diagram");
  const layout=M.layout;
  if(!layout){ canvas.width=0; canvas.height=0; return; }

  const xs=Object.values(layout).map(p=>p.x);
  const ys=Object.values(layout).map(p=>p.y);
  const W=Math.max(...xs)+STATE_R+80;
  const H=Math.max(...ys)+STATE_R+80;
  canvas.width=W; canvas.height=H;

  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#111827";
  ctx.fillRect(0,0,W,H);

  // Draw arrows first
  const drawn={};
  for(const [key,t] of Object.entries(M.transitions)){
    const [st,sym]=key.split(",");
    const nextSt=t[0];
    if(!layout[st]||!layout[nextSt]) continue;
    const label=`${sym==="B"?"□":sym}→${t[1]==="B"?"□":t[1]},${t[2]}`;
    const isSelf=st===nextSt;
    const pairKey=[st,nextSt].sort().join("|");
    if(!drawn[pairKey]) drawn[pairKey]=0;
    const curve=drawn[pairKey];
    drawn[pairKey]++;
    // Arrow is bright if either end was visited
    const wasTraversed = visitedStates.has(st) && visitedStates.has(nextSt);
    drawArrow(ctx,layout[st],layout[nextSt],label,isSelf,curve,st===activeState||nextSt===activeState,wasTraversed);
  }

  // Draw states on top
  for(const [st,pos] of Object.entries(layout)){
    drawState(ctx,pos.x,pos.y,st,
      st===activeState,
      M.accept.includes(st),
      M.reject.includes(st),
      st===M.start,
      visitedStates.has(st));
  }
}

function drawState(ctx,x,y,label,isActive,isAccept,isReject,isStart,wasVisited){
  const R=STATE_R;
  // Color logic:
  // Active (current) = bright violet
  // Accept reached   = bright green
  // Reject reached   = bright red
  // Previously visited (not current) = orange/yellow tint
  // Never visited    = dim teal
  let ringColor, fillColor;
  if(isActive){       ringColor="#d580ff"; fillColor="#2d1050"; }
  else if(isAccept){  ringColor="#5dffa0"; fillColor="#0e3020"; }
  else if(isReject){  ringColor="#ff6b6b"; fillColor="#3a0e0e"; }
  else if(wasVisited){ringColor="#ffe066"; fillColor="#2a2000"; }
  else {              ringColor="#00ffe0"; fillColor="#0a2030"; }

  const dimmed = !isActive && !isAccept && !isReject && !wasVisited;

  // Glow
  if(!dimmed){
    ctx.save();
    ctx.shadowColor=ringColor;
    ctx.shadowBlur=isActive?30:18;
    ctx.beginPath(); ctx.arc(x,y,R,0,Math.PI*2);
    ctx.strokeStyle=ringColor; ctx.lineWidth=isActive?3.5:2.5; ctx.stroke();
    ctx.restore();
  }

  // Fill
  ctx.beginPath(); ctx.arc(x,y,R,0,Math.PI*2);
  ctx.fillStyle=dimmed?"#0d1a2a":fillColor;
  ctx.fill();
  ctx.strokeStyle=dimmed?"#2a4060":ringColor;
  ctx.lineWidth=dimmed?1:isActive?3:2;
  ctx.stroke();

  // Double ring for accept
  if(isAccept){
    ctx.beginPath(); ctx.arc(x,y,R-7,0,Math.PI*2);
    ctx.strokeStyle=ringColor; ctx.lineWidth=1.5; ctx.stroke();
  }

  // State label — white if active/visited, dim if not
  ctx.font=`bold 12px Orbitron, monospace`;
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillStyle=dimmed?"#4a6080":"#ffffff";
  ctx.fillText(label,x,y);

  // Visited tick mark
  if(wasVisited && !isActive && !isAccept && !isReject){
    ctx.font="bold 10px sans-serif";
    ctx.fillStyle="#ffe066";
    ctx.fillText("✓",x+R-8,y-R+8);
  }

  // Start arrow
  if(isStart){
    ctx.beginPath();
    ctx.moveTo(x-R-32,y); ctx.lineTo(x-R-4,y);
    ctx.strokeStyle="#00ffe0"; ctx.lineWidth=2; ctx.stroke();
    drawArrowHead(ctx,x-R-4,y,0,"#00ffe0");
    ctx.font="bold 9px Poppins, sans-serif";
    ctx.fillStyle="#00ffe0";
    ctx.textAlign="center";
    ctx.fillText("start",x-R-18,y-10);
  }
}

function drawArrow(ctx,from,to,label,isSelf,curveIdx,isActive){
  const color=isActive?COLORS.violet:"#8899bb";
  ctx.strokeStyle=color; ctx.fillStyle=color; ctx.lineWidth=isActive?2:1.5;

  if(isSelf){
    const lx=from.x, ly=from.y-STATE_R;
    ctx.beginPath();
    ctx.arc(lx,ly-20,20,Math.PI*0.1,Math.PI*0.9,false);
    ctx.stroke();
    drawArrowHead(ctx,lx+16,ly-6,-0.5,color);
    drawEdgeLabel(ctx,lx,ly-48,label,isActive);
    return;
  }

  const dx=to.x-from.x, dy=to.y-from.y;
  const dist=Math.sqrt(dx*dx+dy*dy);
  const ux=dx/dist, uy=dy/dist;
  const nx=-uy, ny=ux;
  const bend=(curveIdx%2===0?1:-1)*Math.min(44,dist*0.3)*(Math.floor(curveIdx/2)+1)*0.5;

  const sx=from.x+ux*STATE_R, sy=from.y+uy*STATE_R;
  const ex=to.x-ux*STATE_R,   ey=to.y-uy*STATE_R;
  const mx=(sx+ex)/2+nx*bend, my=(sy+ey)/2+ny*bend;

  ctx.beginPath(); ctx.moveTo(sx,sy); ctx.quadraticCurveTo(mx,my,ex,ey); ctx.stroke();

  const tx=ex-mx, ty=ey-my;
  drawArrowHead(ctx,ex,ey,Math.atan2(ty,tx),color);

  const lx=(sx+2*mx+ex)/4, ly=(sy+2*my+ey)/4;
  drawEdgeLabel(ctx,lx,ly,label,isActive);
}

function drawArrowHead(ctx,x,y,angle,color){
  const size=8;
  ctx.save();
  ctx.translate(x,y); ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0,0); ctx.lineTo(-size,-size*0.45); ctx.lineTo(-size,size*0.45);
  ctx.closePath(); ctx.fillStyle=color; ctx.fill();
  ctx.restore();
}

function drawEdgeLabel(ctx,x,y,text,isActive){
  ctx.font = isActive ? `bold 11px Poppins, sans-serif` : `700 10.5px Poppins, sans-serif`;
  const m = ctx.measureText(text);
  const pw = m.width + 14, ph = 18;
  // Fully opaque solid background
  ctx.fillStyle = isActive ? "rgba(60,15,100,1)" : "rgba(12,20,45,1)";
  ctx.beginPath();
  ctx.roundRect(x - pw/2, y - ph/2, pw, ph, 5);
  ctx.fill();
  // Border
  ctx.strokeStyle = isActive ? "#d580ff" : "rgba(93,204,255,0.55)";
  ctx.lineWidth = isActive ? 1.2 : 0.8;
  ctx.stroke();
  // Text
  ctx.fillStyle = isActive ? "#ffffff" : "#ddeeff";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
}

function hexAlpha(hex,alpha){
  // convert named to rgb
  const map={"#00e5c3":"rgba(0,229,195","#a855f7":"rgba(168,85,247","#38bdf8":"rgba(56,189,248","#4ade80":"rgba(74,222,128","#f87171":"rgba(248,113,113","#94a3b8":"rgba(148,163,184"};
  const base=map[hex]||"rgba(100,100,100";
  return `${base},${alpha})`;
}
