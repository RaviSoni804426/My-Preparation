import { Topic, Phase } from '../types';

export const roadmapTopics: Topic[] = [
  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 1: Python Mastery + CS Fundamentals    ║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w1d1',
    title: 'Python Scopes, Closures & Reference Memory Model',
    slug: 'python-scopes-closures-references',
    category: 'Python',
    difficulty: 'Beginner',
    phase: 0 as Phase,
    weekNumber: 1,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'Understand scoping rules (LEGB), closures, python references, id(), and reference counting mechanics.',
    prerequisites: [],
    orderInRoadmap: 1,
    isActive: true,
    learningContent: `### Python Reference Model
Variables in Python are pointers (bindings) to objects in memory, not raw storage slots.
- \`id(x)\` returns the memory address of the object.
- \`sys.getrefcount(x)\` tracks how many bindings point to this address.

\`\`\`python
import sys
x = [1, 2, 3]
y = x
print(sys.getrefcount(x) - 1) # count reference bindings
\`\`\``,
    labDescription: 'Write a closure function that logs parameter call frequencies and keeps track of object reference addresses in memory.',
    interviewQuestions: ['What is the difference between mutable and immutable types in Python?', 'Explain closures and when you would use them.']
  },
  {
    id: 'w1d2',
    title: 'Dynamic Arrays, Comprehensions & Built-ins',
    slug: 'python-dynamic-arrays-comprehensions',
    category: 'Python',
    difficulty: 'Beginner',
    phase: 0 as Phase,
    weekNumber: 1,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Learn memory structures of arrays, list/dict comprehensions, and functional built-ins.',
    prerequisites: ['w1d1'],
    orderInRoadmap: 2,
    isActive: true,
    learningContent: `### Dynamic Arrays
Unlike static arrays, dynamic arrays resize automatically (usually doubling capacity) when they are full.
- Access: $O(1)$
- Append: $O(1)$ amortized ($O(N)$ when copying to a larger memory block)
- Insert/Delete: $O(N)$ due to index shifts.`,
    labDescription: 'Implement a custom dynamic array class in Python utilizing ctypes library that automatically resizes by doubling its capacity.',
    interviewQuestions: ['Why does dynamic array resizing take O(1) amortized time?', 'Compare list comprehensions vs generators in memory usage.']
  },
  {
    id: 'w1d3',
    title: 'Python OOP, Inheritance & the CPython GIL',
    slug: 'python-oop-inheritance-gil',
    category: 'Python',
    difficulty: 'Intermediate',
    phase: 0 as Phase,
    weekNumber: 1,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'Explore inheritance structures, Method Resolution Order (MRO), and the Global Interpreter Lock (GIL).',
    prerequisites: ['w1d2'],
    orderInRoadmap: 3,
    isActive: true,
    learningContent: `### CPython GIL & OOP
- **MRO**: Python uses the C3 Linearization algorithm to determine method resolution paths in multiple inheritance.
- **GIL**: A mutex lock in CPython preventing multiple threads from executing Python bytecodes concurrently, limiting pure numerical scaling on multiple CPUs.`,
    labDescription: 'Build a multi-threaded numerical cruncher and benchmark execution speeds with and without thread limits to witness the GIL bottleneck.',
    interviewQuestions: ['What is python MRO and how does it handle diamond inheritance?', 'How do you bypass the GIL for CPU-heavy tasks?']
  },
  {
    id: 'w1d4',
    title: 'CS Fundamentals: Processes vs Threads',
    slug: 'cs-processes-vs-threads',
    category: 'CS Fundamentals',
    difficulty: 'Intermediate',
    phase: 0 as Phase,
    weekNumber: 1,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Processes, threads, execution context states, scheduling, and context-switching overhead.',
    prerequisites: [],
    orderInRoadmap: 4,
    isActive: true,
    learningContent: `### Process vs Thread
- **Process**: Independent execution unit with isolated memory space (PID, heap, file descriptors).
- **Thread**: Light-weight subset of a process sharing its parent's heap space but keeping a private execution Stack and Program Counter.
- **Context Switching**: The CPU stores register states of the active process/thread and loads the state of the next task, incurring overhead cache misses.`,
    labDescription: 'Write a script that benchmarks system context-switch times when spawning 1000 processes vs 1000 threads.',
    interviewQuestions: ['Describe exactly what happens during context switching in the CPU.', 'When would you select multiprocessing over multithreading?']
  },
  {
    id: 'w1d5',
    title: 'CPU Memory: Stack vs Heap & Paging',
    slug: 'cpu-memory-stack-heap-paging',
    category: 'CS Fundamentals',
    difficulty: 'Intermediate',
    phase: 0 as Phase,
    weekNumber: 1,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Memory structures: Stack frames vs Heap dynamic allocations, Virtual Memory, and Paging.',
    prerequisites: ['w1d4'],
    orderInRoadmap: 5,
    isActive: true,
    learningContent: `### Virtual Memory & Paging
- **Stack**: Fast, synchronous allocation space managed by CPU pointers. Stores local variables and return frame addresses.
- **Heap**: Dynamic memory space allocated during runtime. Managed manually (e.g. malloc/free) or by garbage collection.
- **Paging**: Operating systems partition physical memory into fixed "pages" mapped to virtual addresses via Page Tables to isolate processes.`,
    labDescription: 'Inspect your system page table faults and stack frames manually using debugger tools.',
    interviewQuestions: ['Explain the causes of a Stack Overflow error.', 'What is paging, and how does it protect process memory spaces?']
  },
  {
    id: 'w1d6',
    title: 'Git Internals, Shell Scripts & Linux commands',
    slug: 'git-internals-shell-scripts',
    category: 'CS Fundamentals',
    difficulty: 'Intermediate',
    phase: 0 as Phase,
    weekNumber: 1,
    dayNumber: 6,
    estimatedHours: 5,
    description: 'Git blobs, trees, commits and references. Command line shortcuts and basic scripts.',
    prerequisites: [],
    orderInRoadmap: 6,
    isActive: true,
    learningContent: `### Git internals
Git acts as a content-addressable storage database.
- **Blobs**: Store file contents.
- **Trees**: Model folder hierarchies, linking filename keys to blob hashes.
- **Commits**: Store metadata, parent commit hashes, and point to root tree nodes.`,
    labDescription: 'Examine Git objects in a local `.git/objects` folder and manually reconstruct folder trees.',
    interviewQuestions: ['How does Git use SHA-1 hashes to track directories?', 'Explain what a Git ref points to.']
  },
  {
    id: 'w1d7',
    title: 'Week 1 Revision & CLI Project 1 Integration',
    slug: 'week-1-revision-cli-project',
    category: 'Python',
    difficulty: 'Beginner',
    phase: 0 as Phase,
    weekNumber: 1,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Review Python OOP, GIL restrictions, Stack/Heap structures, and compile CLI Project.',
    prerequisites: ['w1d1', 'w1d2', 'w1d3', 'w1d4', 'w1d5', 'w1d6'],
    orderInRoadmap: 7,
    isActive: true,
    learningContent: 'Consolidate notes and complete CLI Finance Tracker.',
    labDescription: 'Refactor CLI Finance Tracker to utilize abstract classes and JSON database storage.',
    interviewQuestions: ['Summarize the differences between Python multi-processing and multi-threading execution.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 2: Arrays, Strings, Hashing, Recursion║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w2d1',
    title: 'Two Pointers Technique & String Slicing',
    slug: 'two-pointers-and-slicing',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 2,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'Master pointer movement from boundaries (converging) and fast/slow partition sweeps.',
    prerequisites: ['w1d2'],
    orderInRoadmap: 8,
    isActive: true,
    learningContent: `### Two Pointers
Used to sweep through lists contiguously to locate coordinate matches or reverse sequences in $O(N)$ time.
- Converging: Pointer \`left\` starts at index 0, \`right\` at index $N-1$. Shift inward based on comparisons.
- Fast/Slow: \`slow\` pointer logs partition boundaries; \`fast\` scanner sweeps nodes.`,
    labDescription: 'Implement Two Sum on sorted inputs and String compression algorithms recursively.',
    interviewQuestions: ['Describe how to verify if an input string is a valid palindrome in O(1) space.']
  },
  {
    id: 'w2d2',
    title: 'Sliding Window Technique (Fixed & Variable)',
    slug: 'sliding-window-fixed-variable',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 2,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Fixed-length range queries vs variable-length substring matching.',
    prerequisites: ['w2d1'],
    orderInRoadmap: 9,
    isActive: true,
    learningContent: `### Sliding Window
Optimizes nested loops from $O(N^2)$ to $O(N)$ when scanning subarrays.
- **Fixed Window**: Pre-calculate window size $K$, slide index offset from start, adjust edge elements.
- **Variable Window**: Expand \`right\` pointer. If conditions fail, contract \`left\` pointer until valid.`,
    labDescription: 'Write a script that computes the longest substring containing non-repeating characters.',
    interviewQuestions: ['Why is the time complexity of a variable sliding window O(N) even if it has an inner loop?']
  },
  {
    id: 'w2d3',
    title: 'Prefix Sum & Subarray Sum Equals K',
    slug: 'prefix-sum-subarray-patterns',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 2,
    dayNumber: 3,
    estimatedHours: 4,
    description: 'Calculate sub-segment values instantly using cumulative sum indexes.',
    prerequisites: ['w2d1'],
    orderInRoadmap: 10,
    isActive: true,
    learningContent: `### Prefix Sum
Precompute sum indexes where \`prefix[i] = prefix[i-1] + arr[i]\`.
- Any range sum $[L, R]$ can be retrieved in $O(1)$ time: \`sum = prefix[R] - prefix[L-1]\`.`,
    labDescription: 'Solve Subarray Sum Equals K using prefix mapping techniques.',
    interviewQuestions: ['How do you track subarray count sums matching target K in a single pass?']
  },
  {
    id: 'w2d4',
    title: 'Hash Table Theory & Collision Handling',
    slug: 'hash-table-theory-collisions',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 2,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Hashing indices calculations, separate chaining vs open addressing.',
    prerequisites: ['w1d2'],
    orderInRoadmap: 11,
    isActive: true,
    learningContent: `### Hashing mechanics
Maps keys to index locations.
- **Chaining**: Buckets store linked lists to chain conflicting keys.
- **Open Addressing**: Scans subsequent slots (linear/quadratic probing) during conflicts. Requires delete tombstone markers.`,
    labDescription: 'Implement a custom HashMap class in Python with chaining resolution buckets.',
    interviewQuestions: ['Explain the differences between separate chaining and open addressing in hash tables.']
  },
  {
    id: 'w2d5',
    title: 'Python Dict Internals & Set Patterns',
    slug: 'python-dict-internals-sets',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 2,
    dayNumber: 5,
    estimatedHours: 4,
    description: 'How Python dictionaries preserve insertion order and check set items.',
    prerequisites: ['w2d4'],
    orderInRoadmap: 12,
    isActive: true,
    learningContent: `### Python Dictionary Internals
Since version 3.6, Python uses an index array pointing to a dense key-value store, preserving insertion sequence while retaining $O(1)$ lookup performance.`,
    labDescription: 'Write benchmark comparisons of list searches vs dictionary key inspections.',
    interviewQuestions: ['Why is set access O(1) in average cases but can degrade in worst cases?']
  },
  {
    id: 'w2d6',
    title: 'Recursion Call Stack & Memoization Foundations',
    slug: 'recursion-stack-memoization',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 2,
    dayNumber: 6,
    estimatedHours: 5,
    description: 'Recursion base cases, execution stack frame limits, and caching strategies.',
    prerequisites: ['w1d5'],
    orderInRoadmap: 13,
    isActive: true,
    learningContent: `### Recursion Stack
Each recursive call pushes context details onto the thread Stack frame.
- **Memoization**: Stores computed values in memory tables to prevent duplicate subtree branches.`,
    labDescription: 'Create recursive Fibonacci functions comparing standard recursion vs memoization run times.',
    interviewQuestions: ['What occurs during a stack overflow error in recursive calculations?']
  },
  {
    id: 'w2d7',
    title: 'Week 2 Revision & Project 2 Integration',
    slug: 'week-2-revision-browser-history',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 2,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Consolidate dynamic variables scans, caching configurations, and build Browser History simulator.',
    prerequisites: ['w2d1', 'w2d2', 'w2d3', 'w2d4', 'w2d5', 'w2d6'],
    orderInRoadmap: 14,
    isActive: true,
    learningContent: 'Review sliding window indices and build Project 2 history simulator using double stacks.',
    labDescription: 'Build double-stack browser history navigator classes.',
    interviewQuestions: ['Explain sliding window patterns and trace pointer updates.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 3: Linked Lists, Stacks, Queues, Trees ║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w3d1',
    title: 'Linked List Reversals & Cycle Detections',
    slug: 'linked-list-reversals-cycles',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 3,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'In-place linked lists reversals, Floyd cycle detection algorithms.',
    prerequisites: ['w1d1'],
    orderInRoadmap: 15,
    isActive: true,
    learningContent: `### Linked List cycle check
Use fast/slow pointers (Floyd's algorithm).
- Fast pointer advances two nodes; slow pointer advances one.
- If a cycle exists, they meet. If not, fast hits None.`,
    labDescription: 'Write a class function that reverses a singly linked list in-place.',
    interviewQuestions: ['How do you locate the node where a cycle starts?']
  },
  {
    id: 'w3d2',
    title: 'Stacks & Queues (Array & Node implementations)',
    slug: 'stacks-queues-implementations',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 3,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Implement linear structures with node references and static circular arrays.',
    prerequisites: ['w1d2'],
    orderInRoadmap: 16,
    isActive: true,
    learningContent: `### Linear Structures
- **Stack**: Last-In-First-Out (LIFO)
- **Queue**: First-In-First-Out (FIFO). Needs head/tail index wraps in arrays.`,
    labDescription: 'Code a circular queue using fixed arrays with head and tail updates.',
    interviewQuestions: ['How do you implement a queue using two stacks?']
  },
  {
    id: 'w3d3',
    title: 'Monotonic Stack Pattern & Online Stock Span',
    slug: 'monotonic-stack-patterns',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 3,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'Monotonic order parsing to find next greater element in linear time.',
    prerequisites: ['w3d2'],
    orderInRoadmap: 17,
    isActive: true,
    learningContent: `### Monotonic Stack
Keeps stack elements sorted.
- Push index to calculate distance dynamically.`,
    labDescription: 'Solve LeetCode 739 (Daily Temperatures) using a monotonic stack.',
    interviewQuestions: ['Why is a monotonic stack linear time overall if it pops elements in a loop?']
  },
  {
    id: 'w3d4',
    title: 'Binary Tree traversal algorithms (DFS)',
    slug: 'binary-tree-dfs-traversals',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 3,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Preorder, Inorder, Postorder traversals recursively and iteratively.',
    prerequisites: ['w2d6'],
    orderInRoadmap: 18,
    isActive: true,
    learningContent: `### DFS Traversals
- **Preorder**: Root -> Left -> Right
- **Inorder**: Left -> Root -> Right (Sorted order for BSTs)
- **Postorder**: Left -> Right -> Root`,
    labDescription: 'Implement preorder traversal iteratively using a manual stack.',
    interviewQuestions: ['Compare recursion vs manual stacks for tree traversals.']
  },
  {
    id: 'w3d5',
    title: 'Binary Tree Traversals (BFS & Zigzag)',
    slug: 'binary-tree-bfs-zigzag',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 3,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Level-order node processing using FIFO queues.',
    prerequisites: ['w3d2', 'w3d4'],
    orderInRoadmap: 19,
    isActive: true,
    learningContent: `### Level Order (BFS)
Queue elements are processed layer-by-layer:
1. Push Root.
2. For current level length, pop node, append child nodes to queue.`,
    labDescription: 'Write a function that outputs the right-side view of a binary tree.',
    interviewQuestions: ['What is the space complexity of tree BFS on a fully balanced tree?']
  },
  {
    id: 'w3d6',
    title: 'Binary Search Trees (BST) & Validations',
    slug: 'bst-validations-operations',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 3,
    dayNumber: 6,
    estimatedHours: 5,
    description: 'BST insert, delete, and validation methods.',
    prerequisites: ['w3d4'],
    orderInRoadmap: 20,
    isActive: true,
    learningContent: `### BST Rules
For each node, Left subtree values must be less than Node, and Right subtree values greater.`,
    labDescription: 'Implement BST validations checking root boundaries.',
    interviewQuestions: ['How do you delete a node in a BST without breaking invariants?']
  },
  {
    id: 'w3d7',
    title: 'Week 3 Revision & Custom AST Project',
    slug: 'week-3-revision-expression-parser',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 3,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Review trees traversals, stacks structures, and write a mathematical expression parser AST.',
    prerequisites: ['w3d1', 'w3d2', 'w3d3', 'w3d4', 'w3d5', 'w3d6'],
    orderInRoadmap: 21,
    isActive: true,
    learningContent: 'Revisit tree traversals and build expression AST builder.',
    labDescription: 'Implement a binary expression tree evaluator parsing brackets operations.',
    interviewQuestions: ['Describe how to build a tree from infix notation.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 4: Graphs, Backtracking, DP            ║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w4d1',
    title: 'Graph Traversals (DFS & BFS) & Cycle Check',
    slug: 'graph-dfs-bfs-cycle-check',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 4,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'Adjacency list configurations, visiting states, loop detection.',
    prerequisites: ['w3d4', 'w3d5'],
    orderInRoadmap: 22,
    isActive: true,
    learningContent: `### Graph Traversals
Unlike trees, graphs can contain cycles.
- Use a \`visited\` set to block repeat checks.
- Directed loop detection: Track local recursion stack states.`,
    labDescription: 'Write an adjacency list cycle detector.',
    interviewQuestions: ['Explain the difference between cycle detection in directed vs undirected graphs.']
  },
  {
    id: 'w4d2',
    title: 'Topological Sort, Dijkstra & Union-Find',
    slug: 'topological-sort-dijkstra-dsu',
    category: 'DSA',
    difficulty: 'Advanced',
    phase: 1 as Phase,
    weekNumber: 4,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Kahn\'s algorithm, weighted paths, DSU optimizations.',
    prerequisites: ['w4d1'],
    orderInRoadmap: 23,
    isActive: true,
    learningContent: `### Union-Find (DSU)
Efficiently manages partitions:
- **Path Compression**: Points visited nodes directly to root.
- **Union by Rank**: Links shallower trees under deeper roots.`,
    labDescription: 'Solve LeetCode 743 (Network Delay Time) using Dijkstra and heapq.',
    interviewQuestions: ['Detail the execution path and time complexity of Dijkstra\'s algorithm.']
  },
  {
    id: 'w4d3',
    title: 'Backtracking Theory: Permutations & Combinations',
    slug: 'backtracking-permutations-combinations',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 4,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'DFS state-space search trees, choice/un-choice loops.',
    prerequisites: ['w2d6'],
    orderInRoadmap: 24,
    isActive: true,
    learningContent: `### Backtracking
Systematically explores combinations:
\`\`\`python
def backtrack(path, choices):
    if terminal: save(path); return
    for choice in choices:
        choose(choice)
        backtrack(path, remaining)
        unchoose(choice)
\`\`\``,
    labDescription: 'Build recursive array permutations generator.',
    interviewQuestions: ['What is the difference between backtracking and simple DFS?']
  },
  {
    id: 'w4d4',
    title: 'Backtracking Grid Solvers (N-Queens & Sudoku)',
    slug: 'backtracking-grid-solvers',
    category: 'DSA',
    difficulty: 'Advanced',
    phase: 1 as Phase,
    weekNumber: 4,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Coordinate evaluations on 2D matrices, pruning paths.',
    prerequisites: ['w4d3'],
    orderInRoadmap: 25,
    isActive: true,
    learningContent: `### Grid Backtracking
Prunes calculations using conflict maps (e.g. tracking row, column, and subgrid constraints in Sudoku).`,
    labDescription: 'Write an N-Queens solver validating positions.',
    interviewQuestions: ['How do you prune branches in grid matrix search constraints?']
  },
  {
    id: 'w4d5',
    title: '1D Dynamic Programming (Memoization vs Tabulation)',
    slug: 'dp-1d-memoization-tabulation',
    category: 'DSA',
    difficulty: 'Intermediate',
    phase: 1 as Phase,
    weekNumber: 4,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Overlapping subproblems, state equations, array optimizations.',
    prerequisites: ['w2d6'],
    orderInRoadmap: 26,
    isActive: true,
    learningContent: `### DP Concept
Saves results of duplicate computations:
- **Memoization**: Top-down recursion caching.
- **Tabulation**: Bottom-up array updates.`,
    labDescription: 'Implement Coin Change using bottom-up arrays.',
    interviewQuestions: ['Explain optimal substructure in Dynamic Programming.']
  },
  {
    id: 'w4d6',
    title: '2D Grid DP & Sequence Alignment',
    slug: 'dp-2d-sequences-matrices',
    category: 'DSA',
    difficulty: 'Advanced',
    phase: 1 as Phase,
    weekNumber: 4,
    dayNumber: 6,
    estimatedHours: 6,
    description: 'Strings relations and matrix path optimizations.',
    prerequisites: ['w4d5'],
    orderInRoadmap: 27,
    isActive: true,
    learningContent: `### 2D DP
Computes transformations (e.g., Edit Distance, Longest Common Subsequence) using a grid mapping subproblems.`,
    labDescription: 'Solve Edit Distance using 2D DP arrays.',
    interviewQuestions: ['Explain how to construct the state equation for Edit Distance.']
  },
  {
    id: 'w4d7',
    title: 'Week 4 Revision & Graph Project Integration',
    slug: 'week-4-revision-social-network',
    category: 'DSA',
    difficulty: 'Advanced',
    phase: 1 as Phase,
    weekNumber: 4,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Consolidate graphs, backtracking loops, cached states, and complete graph social network routing API.',
    prerequisites: ['w4d1', 'w4d2', 'w4d3', 'w4d4', 'w4d5', 'w4d6'],
    orderInRoadmap: 28,
    isActive: true,
    learningContent: 'Revisit graph traversal paths and finalize Project 3.',
    labDescription: 'Build Social Network connection routing APIs.',
    interviewQuestions: ['Summarize the differences between memoization caching and bottom-up arrays.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 5: Backend REST & Postgres             ║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w5d1',
    title: 'Web Protocols: TCP/IP Stack & HTTP/1-3',
    slug: 'web-protocols-tcp-ip-http',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 5,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'TCP handshakes, DNS steps, HTTP/1 pipelining vs HTTP/2 multiplexing vs HTTP/3 QUIC.',
    prerequisites: ['w1d4'],
    orderInRoadmap: 29,
    isActive: true,
    learningContent: `### HTTP Evolution
- **HTTP/1.1**: Persistent connections but suffers from Head-of-Line blocking.
- **HTTP/2**: Multiplexes requests over a single TCP connection.
- **HTTP/3**: Switches to UDP-based QUIC protocol, eliminating TCP connection delays.`,
    labDescription: 'Write a basic Python socket server listening for TCP requests.',
    interviewQuestions: ['Explain the steps in a TCP 3-way handshake.', 'How does HTTP/2 solve Head-of-Line blocking?']
  },
  {
    id: 'w5d2',
    title: 'REST API Constraints & FastAPI Router Architecture',
    slug: 'rest-constraints-fastapi-routers',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 5,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'REST constraints, route validations, paths parameters, and return schemas.',
    prerequisites: ['w1d3'],
    orderInRoadmap: 30,
    isActive: true,
    learningContent: `### REST Principles
Statelessness, client-server decoupling, and cacheable endpoints. FastAPI uses Pydantic to enforce request and response schemas.`,
    labDescription: 'Build a CRUD resource router with FastAPI validations.',
    interviewQuestions: ['Define idempotency and list idempotent HTTP verbs.', 'How does Pydantic serialize data?']
  },
  {
    id: 'w5d3',
    title: 'Dependency Injections & JWT Authentication Flow',
    slug: 'fastapi-dependency-injection-jwt',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 5,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'FastAPI Depends system, password hashing, JWT issue/verifications.',
    prerequisites: ['w5d2'],
    orderInRoadmap: 31,
    isActive: true,
    learningContent: `### JWT Stateless Authentication
Server issues signed JSON tokens containing user scopes. The server verifies signatures rather than querying session databases.`,
    labDescription: 'Write JWT verification middleware hooks for FastAPI routes.',
    interviewQuestions: ['Why should JWT payloads not store passwords?', 'Explain dependency injection benefits.']
  },
  {
    id: 'w5d4',
    title: 'Database Normalization & ER Schemas Design',
    slug: 'database-normalization-er-design',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 5,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Relational data layouts, primary/foreign keys, 1NF to 3NF constraints.',
    prerequisites: [],
    orderInRoadmap: 32,
    isActive: true,
    learningContent: `### DB Normalization
- **1NF**: Atomic values.
- **2NF**: No partial functional dependencies.
- **3NF**: No transitive dependencies.`,
    labDescription: 'Design an Entity-Relationship schema for a Task Manager application.',
    interviewQuestions: ['Explain the trade-offs of sharding normalized databases.']
  },
  {
    id: 'w5d5',
    title: 'SQL JOINs, Subqueries & Aggregate CTEs',
    slug: 'sql-joins-subqueries-ctes',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 5,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Inner/Outer joins, subqueries, grouping indices, window functions, and Common Table Expressions.',
    prerequisites: [],
    orderInRoadmap: 33,
    isActive: true,
    learningContent: `### SQL CTEs
\`\`\`sql
WITH avg_salary AS (
    SELECT dept_id, AVG(salary) as avg_val FROM employees GROUP BY dept_id
)
SELECT e.name FROM employees e
JOIN avg_salary a ON e.dept_id = a.dept_id
WHERE e.salary > a.avg_val;
\`\`\``,
    labDescription: 'Solve SQL aggregations tasks using CTE setups.',
    interviewQuestions: ['What is the difference between WHERE and HAVING in SQL queries?']
  },
  {
    id: 'w5d6',
    title: 'Database Indexes (B-Trees) & Transactions ACID',
    slug: 'db-indexes-acid-isolation',
    category: 'Backend',
    difficulty: 'Advanced',
    phase: 2 as Phase,
    weekNumber: 5,
    dayNumber: 6,
    estimatedHours: 5,
    description: 'B-Tree node index checks, write penalties, isolation levels, ACID properties.',
    prerequisites: ['w5d4'],
    orderInRoadmap: 34,
    isActive: true,
    learningContent: `### ACID Transactions
- **Atomicity**: All or nothing.
- **Consistency**: Transition between valid states.
- **Isolation**: Concurrent runs yield identical results.
- **Durability**: Survives system crashes.`,
    labDescription: 'Examine query plans with EXPLAIN ANALYZE checking index scans.',
    interviewQuestions: ['Detail the differences between Read Committed and Serializable isolation levels.']
  },
  {
    id: 'w5d7',
    title: 'Week 5 Revision & DB Integration REST project',
    slug: 'week-5-revision-task-api',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 5,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Review network layers, REST routes, SQL queries, and complete CRUD Task API.',
    prerequisites: ['w5d1', 'w5d2', 'w5d3', 'w5d4', 'w5d5', 'w5d6'],
    orderInRoadmap: 35,
    isActive: true,
    learningContent: 'Revisit async engines and verify Project 4 tasks database mappings.',
    labDescription: 'Integrate PostgreSQL and SQLAlchemy async engines.',
    interviewQuestions: ['Detail how indexing accelerates database read operations.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 6: Redis, Celery, Docker, Microservices║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w6d1',
    title: 'Redis In-Memory Database & Caching Patterns',
    slug: 'redis-in-memory-caching-patterns',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 6,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'Redis data structures, cache-aside structures, expirations keys.',
    prerequisites: ['w5d7'],
    orderInRoadmap: 36,
    isActive: true,
    learningContent: `### Cache-Aside Pattern
1. API receives read request.
2. Query Redis. On hit, return data.
3. On miss, read DB, save to Redis with TTL, return data.`,
    labDescription: 'Build an auto-invalidating caching layer in FastAPI.',
    interviewQuestions: ['What are the risks of cache penetration, and how do you solve them?']
  },
  {
    id: 'w6d2',
    title: 'Redis Sorted Sets (ZSET) & Rate Limiting Middleware',
    slug: 'redis-rate-limiting-middleware',
    category: 'Backend',
    difficulty: 'Advanced',
    phase: 2 as Phase,
    weekNumber: 6,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Sliding window algorithms using sorted timestamp scopes.',
    prerequisites: ['w6d1'],
    orderInRoadmap: 37,
    isActive: true,
    learningContent: `### Sliding Window Rate Limiting
ZSET records user API calls. Delete entries older than window limit, count total remaining values.`,
    labDescription: 'Implement dynamic rate limiters in FastAPI middleware using Redis ZSET.',
    interviewQuestions: ['Why use Redis ZSET over simple counters for rate limits?']
  },
  {
    id: 'w6d3',
    title: 'Asynchronous Tasks: Celery & Redis Message Broker',
    slug: 'celery-async-tasks-redis-broker',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 6,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'Decoupling thread computations using queue worker processes.',
    prerequisites: ['w6d1'],
    orderInRoadmap: 38,
    isActive: true,
    learningContent: `### Celery Queue
Main thread delegates heavy computations (e.g. notifications) by posting task details to Redis brokers. Workers poll Redis and process tasks.`,
    labDescription: 'Configure Celery background email reminders route.',
    interviewQuestions: ['How do you coordinate task status tracking across separate worker nodes?']
  },
  {
    id: 'w6d4',
    title: 'Docker Image Layerings & Multi-stage Builds',
    slug: 'docker-layering-multi-stage-builds',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 6,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Container runtimes, image instructions optimization, multi-stage compilation.',
    prerequisites: [],
    orderInRoadmap: 39,
    isActive: true,
    learningContent: `### Multi-Stage Dockerfile
Use compile stages to download dependencies, then copy only built artifacts to lightweight runtime stages, keeping output sizes low.`,
    labDescription: 'Write a multi-stage Dockerfile for FastAPI applications.',
    interviewQuestions: ['How do you optimize Docker build layer caching?']
  },
  {
    id: 'w6d5',
    title: 'Multi-service Container Orchestration: docker-compose',
    slug: 'docker-compose-multi-service',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 6,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Virtual container networks, volumes mappings, dependencies orchestration.',
    prerequisites: ['w6d4'],
    orderInRoadmap: 40,
    isActive: true,
    learningContent: `### compose networking
Containers address one another directly over virtual bridge networks by service name (e.g., \`postgres://db:5432\`).`,
    labDescription: 'Orchestrate FastAPI, Postgres, Redis and Celery inside docker-compose.',
    interviewQuestions: ['Explain the difference between Docker bind mounts and named volumes.']
  },
  {
    id: 'w6d6',
    title: 'Production API testing with Pytest & Profiling',
    slug: 'api-testing-pytest-profiling',
    category: 'Backend',
    difficulty: 'Intermediate',
    phase: 2 as Phase,
    weekNumber: 6,
    dayNumber: 6,
    estimatedHours: 5,
    description: 'DB transaction rollbacks in tests, cProfile bottleneck traces.',
    prerequisites: ['w5d7', 'w6d5'],
    orderInRoadmap: 41,
    isActive: true,
    learningContent: `### Test DB Isolation
Mock database connections during integration runs. Wrap tests in SQL transactions that roll back automatically after running.`,
    labDescription: 'Write integration test modules validating FastAPI JWT authentications.',
    interviewQuestions: ['How do you mock Redis calls during test suite executions?']
  },
  {
    id: 'w6d7',
    title: 'Week 6 Revision & Complete Production Task Service',
    slug: 'week-6-revision-dockerized-service',
    category: 'Backend',
    difficulty: 'Advanced',
    phase: 2 as Phase,
    weekNumber: 6,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Verify container deployments, cached speeds, worker loops, and deploy task manager service.',
    prerequisites: ['w6d1', 'w6d2', 'w6d3', 'w6d4', 'w6d5', 'w6d6'],
    orderInRoadmap: 42,
    isActive: true,
    learningContent: 'Revisit container routing and confirm Project 4 Docker files run.',
    labDescription: 'Deploy compose microservices to local networks.',
    interviewQuestions: ['Describe sliding-window rate limiting execution logic.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 7: System Design — LLD, HLD, Scalability║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w7d1',
    title: 'SOLID Code Guidelines & UML Class Mapping',
    slug: 'solid-guidelines-uml-mapping',
    category: 'System Design',
    difficulty: 'Intermediate',
    phase: 3 as Phase,
    weekNumber: 7,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'OOP design structures, dependency inversions, class interface mappings.',
    prerequisites: ['w1d3'],
    orderInRoadmap: 43,
    isActive: true,
    learningContent: `### SOLID Principles
- **S**: Single Responsibility.
- **O**: Open-Closed (extend, don't modify).
- **L**: Liskov Substitution.
- **I**: Interface Segregation.
- **D**: Dependency Inversion.`,
    labDescription: 'Refactor modular class definitions to satisfy SOLID constraints.',
    interviewQuestions: ['Provide code examples violating Liskov Substitution.']
  },
  {
    id: 'w7d2',
    title: 'Design Patterns: Factory, Strategy & Observer',
    slug: 'design-patterns-gof-basics',
    category: 'System Design',
    difficulty: 'Intermediate',
    phase: 3 as Phase,
    weekNumber: 7,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Creational, structural, and behavioral GoF patterns.',
    prerequisites: ['w7d1'],
    orderInRoadmap: 44,
    isActive: true,
    learningContent: `### Strategy & Observer
- **Strategy**: Encapsulates interchangeable algorithms inside class objects.
- **Observer**: Subscribes event handlers to node updates dynamically.`,
    labDescription: 'Build event notification classes using Observer patterns.',
    interviewQuestions: ['When would you use an Adapter pattern vs a Decorator pattern?']
  },
  {
    id: 'w7d3',
    title: 'LLD Case Study: Parking Lot Controller',
    slug: 'lld-parking-lot-case',
    category: 'System Design',
    difficulty: 'Intermediate',
    phase: 3 as Phase,
    weekNumber: 7,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'Write OOP interfaces and database models for Parking Lot simulations.',
    prerequisites: ['w7d2'],
    orderInRoadmap: 45,
    isActive: true,
    learningContent: `### LLD Execution Framework
Identify core entities (Vehicle, Spot, Ticket, Floor) and establish class relationships before writing code.`,
    labDescription: 'Implement Parking Lot vehicle spot allocation algorithms.',
    interviewQuestions: ['How do you support thread-safety in dynamic parking slot bookings?']
  },
  {
    id: 'w7d4',
    title: 'HLD Foundations: Latency, CDs, & Load Balancers',
    slug: 'hld-foundations-scalability-balancers',
    category: 'System Design',
    difficulty: 'Intermediate',
    phase: 3 as Phase,
    weekNumber: 7,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Scale metrics estimation, load balancing rules, edge caching.',
    prerequisites: ['w5d1'],
    orderInRoadmap: 46,
    isActive: true,
    learningContent: `### Load Balancing Heuristics
- **L4 LB**: Routes connection sessions using IP and TCP port rules.
- **L7 LB**: Decodes HTTP headers and paths to route traffic intelligently.`,
    labDescription: 'Estimate QPS limits and storage allocations for a URL Shortener system.',
    interviewQuestions: ['Explain the differences between round-robin and least-connections routing rules.']
  },
  {
    id: 'w7d5',
    title: 'HLD Database Scale: Sharding & Consistent Hashing',
    slug: 'hld-db-sharding-consistent-hashing',
    category: 'System Design',
    difficulty: 'Advanced',
    phase: 3 as Phase,
    weekNumber: 7,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Read replicas setups, consistent hashing rings database divisions.',
    prerequisites: ['w5d6', 'w7d4'],
    orderInRoadmap: 47,
    isActive: true,
    learningContent: `### Consistent Hashing
Maps servers and data keys to a 360-degree integer ring. Minimizes data relocation when servers scale.`,
    labDescription: 'Code a consistent hash ring helper that routes keys to servers.',
    interviewQuestions: ['Why does modulo database sharding perform poorly under node additions?']
  },
  {
    id: 'w7d6',
    title: 'HLD Systems: Real-time Chats & News Feeds',
    slug: 'hld-cases-whatsapp-newsfeed',
    category: 'System Design',
    difficulty: 'Advanced',
    phase: 3 as Phase,
    weekNumber: 7,
    dayNumber: 6,
    estimatedHours: 6,
    description: 'WebSockets, message brokers queues, News Feed fan-out writes.',
    prerequisites: ['w6d3', 'w7d5'],
    orderInRoadmap: 48,
    isActive: true,
    learningContent: `### News Feed Delivery
- **Push (Fan-out on Write)**: Injects updates to followers' cache structures immediately on creation.
- **Pull (Fan-out on Read)**: Assembles feed dynamically when requested.`,
    labDescription: 'Draw a complete architecture diagram mapping out newsfeed caching layers.',
    interviewQuestions: ['How do you scale WebSocket connections to support millions of chat users?']
  },
  {
    id: 'w7d7',
    title: 'Week 7 Revision & Whiteboard Design Mock',
    slug: 'week-7-revision-whiteboard-design',
    category: 'System Design',
    difficulty: 'Advanced',
    phase: 3 as Phase,
    weekNumber: 7,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Practice systems designs whiteboard steps and calculate estimates under pressure.',
    prerequisites: ['w7d1', 'w7d2', 'w7d3', 'w7d4', 'w7d5', 'w7d6'],
    orderInRoadmap: 49,
    isActive: true,
    learningContent: 'Revisit LLD class relations and practice HLD design steps.',
    labDescription: 'Conduct a mock whiteboard design session for an Elevator Controller.',
    interviewQuestions: ['Explain how CDNs route content to geographical endpoints.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 8: ML + Deep Learning + NLP            ║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w8d1',
    title: 'Machine Learning Pipelines & Scikit-Learn',
    slug: 'ml-pipelines-scikit-learn',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    phase: 4 as Phase,
    weekNumber: 8,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'Classification metrics (Precision, Recall, F1), bias-variance trade-off.',
    prerequisites: [],
    orderInRoadmap: 50,
    isActive: true,
    learningContent: `### Classification Metrics
- **F1 Score**: Harmonic mean of Precision and Recall.
- **Bias-Variance**: High bias causes underfitting; high variance causes overfitting.`,
    labDescription: 'Train a classifier model using Scikit-Learn data pipelines.',
    interviewQuestions: ['Why is accuracy a poor metric for imbalanced datasets?']
  },
  {
    id: 'w8d2',
    title: 'Deep Learning & PyTorch Autograd Engine',
    slug: 'pytorch-autograd-deep-learning',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 8,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Backpropagation, gradient descent, neural networks optimization.',
    prerequisites: ['w8d1'],
    orderInRoadmap: 51,
    isActive: true,
    learningContent: `### Backpropagation
Backpropagation uses the calculus Chain Rule to compute the gradients of loss functions with respect to network weights, updating coordinates in optimization steps.`,
    labDescription: 'Train a PyTorch Feedforward network on tabular data.',
    interviewQuestions: ['Explain the math behind backpropagation calculations.']
  },
  {
    id: 'w8d3',
    title: 'Text preprocessing: BPE Tokenizers & Vectors',
    slug: 'nlp-tokenizers-word-embeddings',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    phase: 4 as Phase,
    weekNumber: 8,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'Byte-Pair Encoding tokenization, static vector space embeddings.',
    prerequisites: ['w1d2', 'w8d2'],
    orderInRoadmap: 52,
    isActive: true,
    learningContent: `### Tokenization
BPE scans characters, dynamically grouping the most frequent token pairs together into single dictionary keys.`,
    labDescription: 'Code a BPE tokenizer from scratch.',
    interviewQuestions: ['Describe how Byte-Pair Encoding merges text characters.']
  },
  {
    id: 'w8d4',
    title: 'Sequential Networks: RNNs & LSTMs',
    slug: 'nlp-sequence-rnn-lstm',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    phase: 4 as Phase,
    weekNumber: 8,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Vanishing gradient bottlenecks, gated recurrent feedback networks.',
    prerequisites: ['w8d2'],
    orderInRoadmap: 53,
    isActive: true,
    learningContent: `### LSTMs
Utilize input, forget, and output gates to pass information along cell memory states, blocking vanishing gradients.`,
    labDescription: 'Train a character-level sequence generator using PyTorch LSTMs.',
    interviewQuestions: ['Describe vanishing gradients in traditional RNN layouts.']
  },
  {
    id: 'w8d5',
    title: 'Attention Mechanism Math (Query, Key, Value)',
    slug: 'transformer-attention-math',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 8,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Scaled dot-product attention equation derivations.',
    prerequisites: ['w8d2'],
    orderInRoadmap: 54,
    isActive: true,
    learningContent: `### Attention Formula
$$Attention(Q, K, V) = Softmax(\\frac{Q K^T}{\\sqrt{d_k}}) V$$`,
    labDescription: 'Code scaled dot-product attention queries using raw numpy.',
    interviewQuestions: ['Why divide by the square root of query dimensions?']
  },
  {
    id: 'w8d6',
    title: 'Transformer Blocks & Positional Encodings',
    slug: 'transformer-architecture-blocks',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 8,
    dayNumber: 6,
    estimatedHours: 6,
    description: 'Multi-Head Attention layers, positional embeddings mapping.',
    prerequisites: ['w8d5'],
    orderInRoadmap: 55,
    isActive: true,
    learningContent: `### Multi-Head Attention
Executes multiple attention calculations in parallel, enabling models to associate words under different semantic viewpoints.`,
    labDescription: 'Build a Multi-Head Attention layer in PyTorch.',
    interviewQuestions: ['What is the role of Positional Encodings inside Transformer layers?']
  },
  {
    id: 'w8d7',
    title: 'Week 8 Revision & PyTorch Digit Project',
    slug: 'week-8-revision-pytorch-digit',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 8,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Review classification pipelines, backprop math, attention weights, and build digit classifier.',
    prerequisites: ['w8d1', 'w8d2', 'w8d3', 'w8d4', 'w8d5', 'w8d6'],
    orderInRoadmap: 56,
    isActive: true,
    learningContent: 'Revisit scaled dot-products and run Project 5 model training tests.',
    labDescription: 'Build digit classifier pipelines using PyTorch.',
    interviewQuestions: ['Describe how Multi-Head Attention routes signals to outputs.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 9: LLM Engineering — APIs, RAG, Agents ║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w9d1',
    title: 'LLM APIs & Prompt Engineering Patterns',
    slug: 'llm-apis-prompt-patterns',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    phase: 4 as Phase,
    weekNumber: 9,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'Temperature parameters, Chain-of-Thought prompts, few-shot structures.',
    prerequisites: ['w5d2'],
    orderInRoadmap: 57,
    isActive: true,
    learningContent: `### Prompt Architectures
- **Chain-of-Thought (CoT)**: Directs the model to output intermediate reasoning steps before answering.
- **Few-shot**: Injects target examples inside prompt windows to teach task patterns.`,
    labDescription: 'Build validation wrappers enforcing JSON responses from LLM APIs.',
    interviewQuestions: ['How does model temperature adjust generation probability patterns?']
  },
  {
    id: 'w9d2',
    title: 'Document Processing & Semantic Chunking',
    slug: 'document-processing-semantic-chunking',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    phase: 4 as Phase,
    weekNumber: 9,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Extracting text from files, chunk splitting strategies.',
    prerequisites: ['w9d1'],
    orderInRoadmap: 58,
    isActive: true,
    learningContent: `### Semantic Chunking
Instead of splitting text at fixed character limits, divide text when semantic shifts occur (e.g. at section breaks or paragraph transitions) to keep context intact.`,
    labDescription: 'Write a semantic text chunker using python libraries.',
    interviewQuestions: ['What are the risks of using too small or too large chunk sizes in vector lookups?']
  },
  {
    id: 'w9d3',
    title: 'Embedding Spaces & Vector Databases (Chroma)',
    slug: 'embedding-spaces-vector-databases',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    phase: 4 as Phase,
    weekNumber: 9,
    dayNumber: 3,
    estimatedHours: 5,
    description: 'Embedding projections, indexing structures, Chroma database queries.',
    prerequisites: ['w8d3', 'w9d2'],
    orderInRoadmap: 59,
    isActive: true,
    learningContent: `### Vector DBs
Store coordinates generated by embedding models. They index vector spaces using hierarchical graphs (HNSW) to support fast queries.`,
    labDescription: 'Initialize local ChromaDB collections seeding document embeddings.',
    interviewQuestions: ['Compare Cosine Similarity and L2 Euclidean distance measurements.']
  },
  {
    id: 'w9d4',
    title: 'Retrieval-Augmented Generation (RAG) Pipelines',
    slug: 'rag-pipelines-context-injection',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 9,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Retrieve context, format prompts, generate answers.',
    prerequisites: ['w9d3'],
    orderInRoadmap: 60,
    isActive: true,
    learningContent: `### RAG Flow
1. Receive query.
2. Query vector database for matching chunks.
3. Inject chunks into prompt context.
4. Call LLM API to generate answers.`,
    labDescription: 'Build an end-to-end RAG script in Python.',
    interviewQuestions: ['How does RAG resolve cut-off issues and hallucinations in pre-trained models?']
  },
  {
    id: 'w9d5',
    title: 'Agentic AI: Tool Calling & ReAct Execution loops',
    slug: 'agentic-ai-tool-calling-react',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 9,
    dayNumber: 5,
    estimatedHours: 6,
    description: 'Function calling mapping, loop decision runs.',
    prerequisites: ['w9d4'],
    orderInRoadmap: 61,
    isActive: true,
    learningContent: `### ReAct Loop
Interleaves reasoning (thoughts) and actions (calling tools).
\`\`\`
Thought: I need to use the calculator.
Action: call_calculator[3 + 5]
Observation: 8
Thought: I can now answer the query.
\`\`\``,
    labDescription: 'Build an agent executor loop calling custom calculator tools.',
    interviewQuestions: ['Detail the steps in a model-guided function calling loop.']
  },
  {
    id: 'w9d6',
    title: 'Multi-Agent Orchestrations with LangGraph',
    slug: 'multi-agent-orchestrations-langgraph',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 9,
    dayNumber: 6,
    estimatedHours: 6,
    description: 'State nodes, custom routing edges, checkpointer memories.',
    prerequisites: ['w9d5'],
    orderInRoadmap: 62,
    isActive: true,
    learningContent: `### LangGraph State Machine
Model agent networks as state graphs:
- **Nodes**: Execute code or call models.
- **Edges**: Route control conditionally based on state parameter updates.`,
    labDescription: 'Build multi-agent state routers checking search scopes.',
    interviewQuestions: ['How do state checkpointers enable conversational memory in agent networks?']
  },
  {
    id: 'w9d7',
    title: 'Week 9 Revision & RAG Chatbot Project',
    slug: 'week-9-revision-rag-chatbot',
    category: 'AI/ML',
    difficulty: 'Advanced',
    phase: 4 as Phase,
    weekNumber: 9,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Review semantic partitions, vector databases, LangGraph nodes, and build RAG chatbot.',
    prerequisites: ['w9d1', 'w9d2', 'w9d3', 'w9d4', 'w9d5', 'w9d6'],
    orderInRoadmap: 63,
    isActive: true,
    learningContent: 'Audit context retrieval scopes and finalize Project 5 RAG Chatbot.',
    labDescription: 'Implement conversational PDF loaders seeding local DB collections.',
    interviewQuestions: ['Summarize the differences between RAG pipelines and model fine-tuning.']
  },

  // ╔══════════════════════════════════════════════╗
  // ║  WEEK 10: Production AI & Interview Sprint   ║
  // ╚══════════════════════════════════════════════╝
  {
    id: 'w10d1',
    title: 'Production LLMs: SSE Streaming & Evals',
    slug: 'production-llms-sse-evals',
    category: 'Interview',
    difficulty: 'Advanced',
    phase: 5 as Phase,
    weekNumber: 10,
    dayNumber: 1,
    estimatedHours: 5,
    description: 'Streaming Response tokens using Server-Sent Events, testing faithfulness metrics.',
    prerequisites: ['w6d6', 'w9d7'],
    orderInRoadmap: 64,
    isActive: true,
    learningContent: `### Server-Sent Events (SSE)
Standard HTTP streams enabling servers to push text chunks to browsers, eliminating token collection delays.`,
    labDescription: 'Implement text streaming response routes in FastAPI.',
    interviewQuestions: ['Compare Server-Sent Events (SSE) and WebSockets for LLM chat streaming.']
  },
  {
    id: 'w10d2',
    title: 'HNSW Vector Indexes & Query Optimization',
    slug: 'vector-indexing-hnsw-optimizations',
    category: 'Interview',
    difficulty: 'Advanced',
    phase: 5 as Phase,
    weekNumber: 10,
    dayNumber: 2,
    estimatedHours: 5,
    description: 'Graph search layers, approximate nearest neighbors calculations.',
    prerequisites: ['w9d3', 'w10d1'],
    orderInRoadmap: 65,
    isActive: true,
    learningContent: `### HNSW Graph Search
Hierarchical Navigable Small World (HNSW) maps vectors into layered proximity graphs. Speeds up searches from $O(N)$ to $O(\\log N)$.`,
    labDescription: 'Run latency tests comparing brute-force scans vs HNSW index queries.',
    interviewQuestions: ['Explain the math and structures supporting HNSW search algorithms.']
  },
  {
    id: 'w10d3',
    title: 'Flagship Project: AI Research Assistant (Multi-Agent)',
    slug: 'flagship-project-research-assistant',
    category: 'Interview',
    difficulty: 'Advanced',
    phase: 5 as Phase,
    weekNumber: 10,
    dayNumber: 3,
    estimatedHours: 6,
    description: 'System details integration, supervisor routing configuration.',
    prerequisites: ['w9d6', 'w10d2'],
    orderInRoadmap: 66,
    isActive: true,
    learningContent: `### Flagship Assistant
Coordinates Research nodes (scraping APIs) and Writing nodes (drafting text), streaming tokens in real-time.`,
    labDescription: 'Assemble LangGraph supervisor state routers mapping search queries.',
    interviewQuestions: ['How do you scale multi-agent networks to handle multiple concurrent chats?']
  },
  {
    id: 'w10d4',
    title: 'Timed Algorithms Interview Mock Sprint',
    slug: 'interview-algorithms-mock-sprint',
    category: 'Interview',
    difficulty: 'Advanced',
    phase: 5 as Phase,
    weekNumber: 10,
    dayNumber: 4,
    estimatedHours: 5,
    description: 'Solve mixed LeetCode Medium/Hard questions under 45-minute limits.',
    prerequisites: [],
    orderInRoadmap: 67,
    isActive: true,
    learningContent: `### Timing Strategies
Divide your interview:
1. Gather constraints (5m).
2. Propose designs (10m).
3. Code algorithms (20m).
4. Run dry tests (10m).`,
    labDescription: 'Complete 3 timed Medium/Hard NeetCode mock tests.',
    interviewQuestions: ['Solve LeetCode algorithm prompts under timer controls.']
  },
  {
    id: 'w10d5',
    title: 'System Design Mock Sprint: scaling RAG systems',
    slug: 'interview-system-design-sprint',
    category: 'Interview',
    difficulty: 'Advanced',
    phase: 5 as Phase,
    weekNumber: 10,
    dayNumber: 5,
    estimatedHours: 5,
    description: 'Architecting vector search engines and agent execution runtimes at scale.',
    prerequisites: ['w7d7', 'w9d4'],
    orderInRoadmap: 68,
    isActive: true,
    learningContent: `### AI System Scale
Ensure high availability by separating query parsing, vector searches, and generator API requests into independent microservices.`,
    labDescription: 'Design scale estimations for document index pipelines.',
    interviewQuestions: ['How would you design a real-time vector search index handling millions of writes?']
  },
  {
    id: 'w10d6',
    title: 'STAR Behavioral Log & Portfolio Presentation',
    slug: 'interview-behavioral-portfolio-prep',
    category: 'Interview',
    difficulty: 'Advanced',
    phase: 5 as Phase,
    weekNumber: 10,
    dayNumber: 6,
    estimatedHours: 5,
    description: 'Gathering STAR metrics from portfolio projects, resume reviews.',
    prerequisites: [],
    orderInRoadmap: 69,
    isActive: true,
    learningContent: `### STAR Structure
- **S**: Situation
- **T**: Task
- **A**: Action
- **R**: Result (Show quantified performance improvements).`,
    labDescription: 'Draft 7 STAR logs based on your week projects.',
    interviewQuestions: ['Tell me about a time you solved a complex backend scaling bug.']
  },
  {
    id: 'w10d7',
    title: 'Final Full-Loop Interview Simulation & Rest',
    slug: 'final-interview-loop-rest',
    category: 'Interview',
    difficulty: 'Advanced',
    phase: 5 as Phase,
    weekNumber: 10,
    dayNumber: 7,
    estimatedHours: 4,
    description: 'Run 1-day simulated mock loop: 2 Coding rounds, 1 System Design round, 1 Behavioral round. Rest.',
    prerequisites: ['w10d1', 'w10d2', 'w10d3', 'w10d4', 'w10d5', 'w10d6'],
    orderInRoadmap: 70,
    isActive: true,
    learningContent: 'Complete all rounds and review mistake logs.',
    labDescription: 'Execute final mock runs.',
    interviewQuestions: ['Solve final custom interview challenges.']
  }
];

export const phaseInfo = [
  { phase: 0 as Phase, title: 'Python + CS Fundamentals', weeks: '1', color: '#6366f1', hours: 35 },
  { phase: 1 as Phase, title: 'Data Structures & Algorithms', weeks: '2–4', color: '#3b82f6', hours: 110 },
  { phase: 2 as Phase, title: 'Backend Engineering', weeks: '5–6', color: '#10b981', hours: 70 },
  { phase: 3 as Phase, title: 'System Design', weeks: '7', color: '#f59e0b', hours: 35 },
  { phase: 4 as Phase, title: 'AI/ML & LLM Engineering', weeks: '8–9', color: '#8b5cf6', hours: 70 },
  { phase: 5 as Phase, title: 'Production AI & Interviews', weeks: '10', color: '#ef4444', hours: 40 }
];
