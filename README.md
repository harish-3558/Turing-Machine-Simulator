# Turing Machine — Theory & Concepts

This simulator lets you load a predefined Turing Machine, enter an input string, and watch it execute step by step — showing the tape head movement, current state, and each transition rule applied in real time. It visually traces the full computation path until the machine either **accepts** or **rejects** the input, making abstract TM theory concrete and easy to follow.

A comprehensive reference on how **Turing Machines** work, covering formal definitions, components, transition functions, language classes, and worked examples.

---

## 📌 What is a Turing Machine?

A **Turing Machine (TM)** is the most powerful theoretical model of computation, introduced by **Alan Turing in 1936**. It serves as the mathematical foundation for what computers can and cannot compute.

Unlike finite automata or pushdown automata, a Turing Machine has:
- An **infinite tape** as its memory (not a finite stack)
- The ability to **move left and right** on the tape
- The ability to **read and write** on the tape

> *"A Turing Machine can simulate any algorithm that can be described by a finite procedure."*

---

## 🔩 Components of a Turing Machine

| Component | Description |
|---|---|
| **Infinite Tape** | A sequence of cells extending infinitely in both directions. Each cell holds one symbol from the tape alphabet Γ. Initially all cells hold the blank symbol □ except for the input. |
| **Read/Write Head** | Points to exactly one cell at a time. It can read the current symbol, write a new symbol, and move one step left (L) or right (R). |
| **State Register** | Holds the current state q ∈ Q. The machine's behavior at each step depends entirely on the current state and the symbol under the head. |
| **Transition Function δ** | The "program" of the machine. Given (current state, symbol read), it specifies (next state, symbol to write, direction to move). |
| **Blank Symbol □** | The default symbol on all empty tape cells. It is part of Γ but not Σ. |

---

## 📐 Formal Definition

A Turing Machine is a **7-tuple**:

```
M = (Q, Σ, Γ, δ, q₀, qₐcc, qᵣₑⱼ)
```

| Symbol | Name | Description |
|---|---|---|
| **Q** | States | A finite, non-empty set of states |
| **Σ** | Input Alphabet | Finite set of input symbols; □ ∉ Σ |
| **Γ** | Tape Alphabet | Finite set; Σ ⊂ Γ, □ ∈ Γ |
| **δ** | Transition Function | δ : Q × Γ → Q × Γ × {L, R} |
| **q₀** | Start State | q₀ ∈ Q |
| **qₐcc** | Accept State | qₐcc ∈ Q; machine halts and accepts |
| **qᵣₑⱼ** | Reject State | qᵣₑⱼ ∈ Q; machine halts and rejects |

### Transition Function

```
δ(current_state, read_symbol) = (next_state, write_symbol, direction)
```

**Example:**
```
δ(q0, 1) = (q1, X, R)
```
Meaning: *"In state q0, reading symbol 1 — write X, move Right, go to state q1."*

---

## ⚙️ How a Turing Machine Operates

### Step-by-Step Execution

1. The machine **starts** in state q₀ with the input written on the tape, head at cell 1.
2. At each step, the machine reads the symbol under the head.
3. It looks up **δ(current state, symbol read)** to get the triple (next state, write, direction).
4. It **writes** the new symbol to the current cell.
5. It **moves** the head Left or Right by one cell.
6. It **transitions** to the next state.
7. Repeat until reaching **qₐcc** (accept) or **qᵣₑⱼ** (reject), or run forever (loop).

### Halting

A TM **halts** when it enters qₐcc or qᵣₑⱼ. A TM may also **loop** (run forever) on some inputs — this is a fundamental property, not a bug.

---

## 🏷️ Configurations and Computation

A **configuration** is a complete snapshot of the TM at one moment:

```
(current_state, tape_contents, head_position)
```

Written compactly as: `...□ q0 a b b □...` (state written left of the head position).

A TM **accepts** input w if starting from the initial configuration, it eventually reaches a configuration with qₐcc.

---

## 📚 Language Classes

Turing Machines define a hierarchy of language complexity:

```
Regular ⊂ Context-Free ⊂ Decidable ⊂ Recognizable ⊂ All Languages
```

| Class | Recognizer | Property |
|---|---|---|
| **Regular** | Finite Automaton (DFA/NFA) | No memory beyond states |
| **Context-Free** | Pushdown Automaton (PDA) | Stack memory |
| **Decidable (Recursive)** | Turing Machine (halts on all inputs) | Always halts; gives yes/no |
| **Turing-Recognizable** | Turing Machine (may loop) | Accepts if in language; may loop otherwise |
| **Undecidable** | No TM exists | Cannot be solved algorithmically |

### Key Results

| Problem | Class |
|---|---|
| { aⁿbⁿ \| n ≥ 0 } | Context-Free |
| { aⁿbⁿcⁿ \| n ≥ 0 } | Decidable (not CFL) |
| Halting Problem | Undecidable |
| A_TM = { ⟨M,w⟩ \| M accepts w } | Turing-Recognizable but Undecidable |

---

## 🔬 Worked Examples

### Example 1 — Even Number of 1s

**Machine:** Accepts binary strings with an even count of 1s.

**States:** q0 = even count (start), q1 = odd count, qA = accept

**Transitions:**
```
δ(q0, 0) = (q0, 0, R)    — 0 doesn't change parity
δ(q0, 1) = (q1, 1, R)    — reading 1 flips to odd
δ(q1, 0) = (q1, 0, R)    — 0 doesn't change parity
δ(q1, 1) = (q0, 1, R)    — reading 1 flips back to even
δ(q0, □) = (qA, □, R)    — blank reached in even state: ACCEPT
δ(q1, □) = (qR, □, R)    — blank reached in odd state: REJECT
```

**Trace for input `1 1`:**
```
Step 1:  q0 reads 1  → write 1, move R, go q1
Step 2:  q1 reads 1  → write 1, move R, go q0
Step 3:  q0 reads □  → ACCEPT  ✅
```

---

### Example 2 — aⁿbⁿ Language

**Machine:** Accepts strings of n a's followed by n b's.

**Strategy:** Repeatedly mark one `a` (→ X) and one `b` (→ Y); scan back; accept when all are marked.

**Transitions (simplified):**
```
δ(q0, a) = (q1, X, R)    — mark first a
δ(q1, a) = (q1, a, R)    — scan right over a's
δ(q1, b) = (q2, Y, L)    — mark matching b
δ(q2, a) = (q2, a, L)    — scan left back to start
δ(q2, X) = (q0, X, R)    — found left boundary, repeat
δ(q0, Y) = (q0, Y, R)    — skip already-matched b's
δ(q0, □) = (qA, □, R)    — all matched: ACCEPT
```

**Trace for `a a b b`:**
```
Iteration 1: mark a→X, scan right, mark b→Y, scan left
Iteration 2: mark a→X, scan right, mark b→Y, scan left
q0 sees □ → ACCEPT ✅
```

---

### Example 3 — wcwᴿ Language

**Machine:** Accepts strings of the form `w # wᴿ` (w over {a,b}, # is separator).

**Strategy:**
1. Read leftmost unmarked symbol (a or b), mark as X.
2. Scan right past # to find the rightmost unmarked symbol on the right side.
3. Verify it matches; mark as Y.
4. Scan left back to X, move right to next symbol.
5. When q0 reaches #, check all right-side symbols are Y → ACCEPT.

**Example:** `a b # b a`
```
Round 1: Read 'a'→X; scan right; rightmost 'a'→Y; scan back
Round 2: Read 'b'→X; scan right; rightmost 'b'→Y; scan back
q0 reaches # → check right: all Y → ACCEPT ✅
```

---

### Example 4 — a²ⁿbⁿ Language

**Machine:** Accepts strings where the number of a's is exactly twice the number of b's.

**Strategy:** For each `b`, mark two `a`s as X (one at a time). Accept only when all a's and b's are fully matched.

**Example:** `a a a a b b` (n=2, 4 a's, 2 b's ✅)
```
Round 1: Mark a→X, mark a→X, mark b→Y; return to start
Round 2: Mark a→X, mark a→X, mark b→Y; return to start
q0 sees □ with no remaining b's → ACCEPT ✅
```

**Rejection:** `a a a b` — 3 a's, 1 b: after marking 2 a's for the 1 b, 1 a is left unmatched → REJECT ❌

---

## 🔑 Key Theorems

| Theorem | Statement |
|---|---|
| **Church–Turing Thesis** | Any effectively computable function can be computed by a Turing Machine |
| **Halting Problem** | There is no TM that decides, for all ⟨M, w⟩, whether M halts on w |
| **Rice's Theorem** | Any non-trivial property of TM languages is undecidable |
| **Closure Properties** | Decidable languages are closed under union, intersection, complement, concatenation, star |
| **Turing Completeness** | A system is Turing Complete if it can simulate any TM |

---

## 📖 Notation Reference

| Symbol | Meaning |
|---|---|
| Q | Set of states |
| Σ | Input alphabet |
| Γ | Tape alphabet |
| □ (or B) | Blank symbol |
| δ | Transition function |
| q₀ | Start state |
| qₐcc / qₐ | Accept state |
| qᵣₑⱼ / qᵣ | Reject state |
| L / R | Move head Left / Right |
| X, Y | Common marker symbols used during computation |
| ⊢* | Derives in zero or more steps (computation relation) |

---

*Reference: Sipser, M. (2012). Introduction to the Theory of Computation (3rd ed.). Cengage Learning.*
