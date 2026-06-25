import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, ChevronRight, CheckCircle2, Circle, Clock, Star, 
  ChevronDown, ExternalLink, Code, Video, Layers, ListTodo, 
  HelpCircle, Lightbulb, Sparkles, BookMarked, ToggleLeft, ToggleRight
} from 'lucide-react';
import { useProgressStore } from '../stores/useProgressStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { useRevisionStore } from '../stores/useRevisionStore';
import { useProblemsStore } from '../stores/useProblemsStore';
import { roadmapTopics } from '../data/roadmap';
import { learningResources } from '../data/resources';
import { portfolioProjects } from '../data/projects';
import { leetcodeProblems } from '../data/problems';
import { getCurrentWeekNumber, categoryColors, difficultyColors, todayISO } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

// 15 Flashcards per week for the Spaced Repetition deck
const weeklyFlashcards: Record<number, { q: string; a: string; ex?: string }[]> = {
  1: [
    { q: "What is the CPython GIL?", a: "The Global Interpreter Lock is a mutex in CPython that prevents multiple native threads from executing Python bytecodes at once, protecting memory reference counts from concurrency races." },
    { q: "Process vs Thread memory differences", a: "Processes have fully isolated address spaces (private heap and code). Threads share the parent process's heap but keep private stacks and program counters." },
    { q: "What occurs during CPU Context Switching?", a: "The CPU registers/state of the current process/thread are saved to RAM/registers, and the saved state of the next task is loaded, causing L1/L2 cache misses." },
    { q: "Compare Stack vs Heap memory allocations.", a: "Stack is fast, manages scopes synchronously via push/pop frames. Heap is slower, stores dynamic objects, and is managed via garbage collection." },
    { q: "What is virtual memory paging?", a: "OS divides physical RAM into frames and maps virtual memory pages to them. A missing page triggers a 'Page Fault' to fetch data from disk." },
    { q: "What is Git blobs?", a: "Blob objects store file contents addressable by their SHA-1 hash, decoupled from filenames or paths." },
    { q: "What is Git trees?", a: "Tree objects represent directory trees, mapping filenames to child tree hashes or file blob hashes." },
    { q: "What is method resolution order (MRO) in Python?", a: "The search hierarchy Python walks to execute inherited methods, computed using the C3 Linearization algorithm." },
    { q: "Explain enclosing scopes closures in Python.", a: "A nested function that retains references to variables inside its enclosing scope (non-local) even after the outer wrapper returns." },
    { q: "List comprehensions vs Generator expressions.", a: "Comprehensions allocate the full list in memory immediately. Generators yield elements on-demand in O(1) space." },
    { q: "How does Python track objects for deletion?", a: "Reference counting (deallocates when count hits 0) combined with a Generational Garbage Collector to resolve cyclic references." },
    { q: "What is the time complexity of dynamic array appends?", a: "Average case O(1). When capacity is full, copying elements to a double-capacity block takes O(N) time, yielding O(1) amortized." },
    { q: "Why are variables in Python references?", a: "Every variable name is a binding point (pointer) referencing an object allocated dynamically on the Heap." },
    { q: "Describe thread scheduling states.", a: "Ready (queued for core), Running (executing on core), Blocked/Waiting (sleeping on I/O, locks, page faults)." },
    { q: "What is the purpose of Git refs?", a: "Refs are user-friendly pointers (like branches or tags) pointing to commit object hashes." }
  ],
  2: [
    { q: "What is the sliding window mechanism?", a: "Maintain two pointers defining a segment. Expand the right pointer. If constraints fail, shrink the left pointer until valid, yielding O(N) complexity." },
    { q: "Why does sliding window fail with negative values?", a: "Negative numbers break the monotonic sum trend: expanding does not guarantee sums will rise, and contracting does not guarantee sums will drop." },
    { q: "Two Pointers: opposite ends vs fast/slow pointer.", a: "Opposite: pointers move inward from boundaries (e.g. sorted arrays). Fast/slow: fast pointer scans inputs while slow marks copy boundaries." },
    { q: "What is the prefix sum concept?", a: "Precompute cumulative sums. Range sums are evaluated in O(1) time: range(L, R) = prefix[R] - prefix[L-1]." },
    { q: "Explain separate chaining hash table conflicts.", a: "Conflicting keys are appended as nodes in a linked list residing at the hashed bucket index." },
    { q: "Explain linear probing collision resolution.", a: "Conflicting keys are written to the next available sequential bucket slot. Requires tombstone values for deletes." },
    { q: "How do Python dictionaries preserve insertion order?", a: "Using a sparse index array pointing to a dense key-value array. Keys are appended sequentially in the dense array." },
    { q: "What is recursion stack frame depth?", a: "Each call pushes parameters to the thread Stack. Exceeding stack limits throws a RecursionError (default limit is 1000 in Python)." },
    { q: "Explain recursion memoization.", a: "Cache results of recursive calls. If duplicate parameters are visited, hit the cache, pruning decision trees." },
    { q: "Define amortized time complexity.", a: "The average cost of an operation over a sequence of runs, where expensive worst-case runs are rare." },
    { q: "What is two pointers cycle checks?", a: "Fast moves 2 nodes, slow moves 1 node. If they intersect, a cycle exists. If fast reaches Null, no cycle is present." },
    { q: "Why are strings immutable in Python?", a: "Enables interning in memory (sharing string literals) and guarantees dictionary keys hash to constant values." },
    { q: "Time complexity of set lookups", a: "Average case O(1). Worst case O(N) when hash collisions map all elements to a single bucket chain." },
    { q: "Explain linear search vs hash table lookups.", a: "Linear search scans all elements sequentially (O(N)). Hash tables compute bucket indices directly (O(1) average)." },
    { q: "What is a sliding window maximum deque?", a: "A deque that stores indexes monotonically decreasing in value, enabling O(1) retrieval of max window values." }
  ],
  3: [
    { q: "Singly vs Doubly Linked List traversals", a: "Singly lists only link forwards, requiring O(N) traversal to find parents. Doubly lists store previous links, enabling O(1) backward shifts." },
    { q: "What is a sentinel node?", a: "Dummy boundary nodes (e.g. head/tail) that eliminate null-pointer checking edges in linked list insertions/deletions." },
    { q: "What is a circular queue array layout?", a: "Queue where tail index wraps back to index 0 using modulo math, keeping memory allocation static." },
    { q: "Explain monotonic stack utility.", a: "Maintains elements in strictly increasing or decreasing order. Used to find next greater or smaller elements in O(N) time." },
    { q: "Compare BFS vs DFS tree traversal space.", a: "BFS space scales with the maximum tree width (O(W), large for full trees). DFS space scales with maximum tree height (O(H))." },
    { q: "What is the inorder traversal of a BST?", a: "An inorder traversal (Left, Root, Right) walks Binary Search Trees in sorted ascending order." },
    { q: "How do you validate if a tree is a BST?", a: "Verify recursively that each node value sits within strict (min, max) boundary conditions inherited from parent nodes." },
    { q: "Time complexity of BST search", a: "O(H) where H is tree height. O(log N) for balanced trees, but degrades to O(N) for skewed list-like trees." },
    { q: "What is Floyd's Tortoise and Hare algorithm?", a: "Cycle detection algorithm using fast and slow pointers. Once they intersect, reset slow to head; move both 1 step to locate cycle start." },
    { q: "What is a binary expression tree?", a: "An AST representing algebra: internal nodes represent operators (+, *, etc.) and leaves represent values." },
    { q: "Stack properties: LIFO applications", a: "Last-In-First-Out. Used in undo actions, parentheses balancing, and browser navigation histories." },
    { q: "Queue properties: FIFO applications", a: "First-In-First-Out. Used in buffer streams, printer jobs, and graph breadth-first traversals." },
    { q: "What is a Binary Search Tree (BST)?", a: "A binary tree where left child nodes are smaller than parent nodes, and right child nodes are larger." },
    { q: "Explain level-order zigzag tree traversal.", a: "Traverse BFS level-by-level, reversing the print order of child lists on alternating levels." },
    { q: "Why does tree deletion require successor checks?", a: "Deleting a node with two children requires replacing its value with its in-order successor (minimum value of right subtree) to keep BST invariants intact." }
  ],
  4: [
    { q: "Graph adjacency list vs matrix space", a: "Adjacency matrix is O(N^2) space. Adjacency list is O(V + E) space, making lists better for sparse graphs." },
    { q: "How to detect cycle in directed graphs?", a: "DFS with three states (white=unvisited, grey=visiting/stack, black=processed). Visiting a grey node indicates a back-edge loop." },
    { q: "Describe Kahn's Topological Sort.", a: "Find nodes with in-degree 0, push them to a queue. As you pop, decrement neighbors' in-degree. If they hit 0, queue them." },
    { q: "What is Dijkstra's shortest path runtime?", a: "O((V + E) log V) when using a binary heap, where log V represents priority queue updates." },
    { q: "Explain Union-Find path compression.", a: "Updates parent pointers of all visited nodes directly to the root during find calls, speeding up future lookups to O(1) amortized." },
    { q: "What is backtracking choices pruning?", a: "Evaluate constraints early. If a partial path violates constraints, return immediately (pruning the subtree) instead of searching further." },
    { q: "Compare backtracking vs DFS.", a: "DFS traverses structural graph nodes. Backtracking traverses virtual decision state paths, building solutions by choosing and unchoosing." },
    { q: "Define Dynamic Programming.", a: "An optimization method that breaks complex problems into overlapping subproblems, solving each once and saving results to a cache." },
    { q: "Compare memoization vs tabulation.", a: "Memoization: Top-down recursion caching (sparse runs, call stack). Tabulation: Bottom-up iterative table filling (fast loops, full runs)." },
    { q: "How does 2D DP model string alignments?", a: "Uses a grid database where cell [i][j] represents the alignment cost between prefix s1[0..i] and s2[0..j]." },
    { q: "What is DSU Union by Rank?", a: "Attach the shorter tree root under the taller tree root during joins to keep tree depth minimal." },
    { q: "Explain N-Queens search space constraints.", a: "Prune placements if they share the same column, positive diagonal (row + col), or negative diagonal (row - col)." },
    { q: "What is the transition state for Knapsack?", a: "dp[i][w] = max(dp[i-1][w], dp[i-1][w-weight[i]] + value[i]) representing skipping or including item i." },
    { q: "Explain topological sorting applications.", a: "Ordering tasks based on dependencies, like compiling files or scheduling package installations." },
    { q: "What is a Disjoint Set Union (DSU)?", a: "A data structure that tracks partitioned groups, providing find() and union() operations." }
  ],
  5: [
    { q: "How does TCP handshake guarantee reliability?", a: "3-step exchange (SYN, SYN-ACK, ACK) negotiating sequence numbers and buffer window sizes before data flows." },
    { q: "Explain HTTP/2 multiplexing.", a: "Allows sending multiple bidirectional request/response streams concurrently over a single TCP connection, eliminating Head-of-Line blocking." },
    { q: "How does HTTP/3 improve HTTP/2?", a: "Replaces TCP with UDP-based QUIC, running packet loss recovery per stream. Loss on one stream does not block other streams." },
    { q: "Detail REST API statelessness.", a: "Each request from a client must contain all context needed to process it. The server does not store user session data in RAM." },
    { q: "FastAPI Depends injection workflow", a: "FastAPI resolves Depends parameters before executing endpoints, sharing database connections or auth decoders dynamically." },
    { q: "What does JWT signature verify?", a: "Verifies the token payload was not altered, by computing the hash of payload and header using a secret key." },
    { q: "Session cookies vs JWT storage", a: "Cookies are stateful, database-bound, and protected. JWTs are stateless, self-contained, but must be protected from XSS." },
    { q: "Explain database normalization forms.", a: "1NF: Atomic values. 2NF: No partial key dependency. 3NF: No transitive key dependency (non-key fields must only depend on the primary key)." },
    { q: "Compare SQL WHERE vs HAVING filters.", a: "WHERE filters rows *before* groups are aggregated. HAVING filters output columns *after* aggregations are computed." },
    { q: "How does a B-Tree index accelerate queries?", a: "Stores keys in balanced search trees, reducing disk page seek times from sequential O(N) scans to O(log N) depth lookups." },
    { q: "What are the ACID properties?", a: "Atomicity (all/none), Consistency (valid state transitions), Isolation (no concurrent leaks), Durability (persisted commits)." },
    { q: "What is Alembic inside SQLAlchemy?", a: "A migration tool that tracks database model code updates and generates incremental SQL scripts to sync table schemas." },
    { q: "What does EXPLAIN ANALYZE execute?", a: "Runs the database query plan and logs step-by-step CPU operations, showing sequential vs index scans." },
    { q: "Explain transaction Isolation Levels.", a: "Read Uncommitted, Read Committed (default), Repeatable Read, and Serializable (fully isolated, lock heavy)." },
    { q: "What are SQL window functions?", a: "Run calculations across a set of table rows related to the current row, returning values without collapsing rows (e.g., ROW_NUMBER())." }
  ],
  6: [
    { q: "What is Cache-Aside workflow?", a: "Read Redis. If present (hit), return. If absent (miss), read DB, write to Redis with TTL, return data." },
    { q: "Explain Cache Stampede failure.", a: "Occurs when a popular key expires, causing all concurrent requests to miss and flood the database at the same time." },
    { q: "How does Redis sliding rate limiter operate?", a: "Adds request epoch times to a sorted set (ZSET). Deletes entries older than window limit, counts remaining records." },
    { q: "What is the Celery worker model?", a: "Main threads push task details to Redis brokers. Celery worker processes pull tasks from Redis and run them asynchronously." },
    { q: "Why use multi-stage Docker builds?", a: "Compile source code inside a dependency stage, then copy only built packages to a bare runtime stage to minimize image sizes." },
    { q: "How does docker-compose route container ports?", a: "Maps container virtual ports to the host OS. Within virtual bridge networks, containers reference each other by service name." },
    { q: "What is Docker layer caching?", a: "Docker caches instructions. If the source files change, all subsequent instructions rebuild. Put stable steps (like package installs) first." },
    { q: "Explain Redis TTL (Time-To-Live).", a: "Configures automatic key deletions after a countdown timer, preventing memory leaks on old cache files." },
    { q: "How do you test async endpoints in Pytest?", a: "Use an async test client and execute database rollbacks inside fixtures to isolate tests." },
    { q: "What is a dead-letter queue in task runners?", a: "A secondary task queue where Celery routes tasks that have failed repeatedly, enabling separate debugging." },
    { q: "Compare Redis vs Memcached.", a: "Redis supports complex structures (ZSET, hashes) and persistence. Memcached is a simpler, fast multithreaded string store." },
    { q: "What is the role of Docker volumes?", a: "Persist data generated by containers on the host disk, keeping data intact when containers restart." },
    { q: "How do you optimize Celery thread pools?", a: "Adjust worker concurrency settings based on CPU cores (for math tasks) or network speeds (for I/O tasks)." },
    { q: "What is python profiling?", a: "Measuring execution logs (e.g. using cProfile) to identify slow functions and SQL queries." },
    { q: "Why is rate limiting critical on public APIs?", a: "Prevents Denial of Service (DoS) attacks, stops web scraping, and preserves database resources." }
  ],
  7: [
    { q: "Single Responsibility Principle (SRP)", a: "A class should have only one reason to change, meaning it should perform only one cohesive function." },
    { q: "Open-Closed Principle (OCP)", a: "Software components should be open for extension (adding new features) but closed for modification (not breaking existing code)." },
    { q: "Liskov Substitution Principle (LSP)", a: "Subclasses must be substitutable for their parent classes without altering program correctness." },
    { q: "Interface Segregation Principle (ISP)", a: "Clients should not be forced to depend on interface methods they do not use. Split large interfaces into smaller ones." },
    { q: "Dependency Inversion Principle (DIP)", a: "High-level code modules should not depend on low-level libraries. Both must depend on abstractions (interfaces)." },
    { q: "Factory Method Pattern", a: "Creational pattern providing an interface for creating objects, but delegating the class instantiation to subclasses." },
    { q: "Strategy Design Pattern", a: "Behavioral pattern encapsulating interchangeable algorithms inside classes, enabling clients to switch logic during runtime." },
    { q: "Observer Pattern", a: "Behavioral pattern where a state object notifies registered observers automatically when changes occur." },
    { q: "What is database sharding?", a: "Horizontal scaling of database tables, splitting rows across multiple database servers based on a shard key." },
    { q: "Explain database Read Replicas.", a: "A primary master database routes writes, and duplicates data asynchronously to slave databases that handle all read traffic." },
    { q: "What is consistent hashing ring virtual nodes?", a: "Mapping a single server to multiple coordinate locations on the hashing ring to balance cache distributions uniformly." },
    { q: "LLD class diagram relationships", a: "Inheritance (is-a), Association (knows-a), Aggregation (has-a, independent), Composition (owns-a, dependent lifecycle)." },
    { q: "What is the News Feed Fan-out on Write?", a: "When a user posts, immediately append the post ID to all followers' feeds in cache. High write cost, fast read speed." },
    { q: "What is the News Feed Fan-out on Read?", a: "When a user logs in, query all followed users' posts and sort them dynamically. Fast write cost, slow read speed." },
    { q: "Explain Anycast CDN routing.", a: "CDNs route traffic to the geographically nearest server using Anycast BGP routing configurations." }
  ],
  8: [
    { q: "Define precision and recall metrics.", a: "Precision: True Positives / (True + False Positives). Recall: True Positives / (True Positives + False Negatives)." },
    { q: "What is the bias-variance trade-off?", a: "Bias causes underfitting (too simple). Variance causes overfitting (memorizes noise). Model optimization balances both." },
    { q: "How does gradient descent optimize weights?", a: "Calculates the derivative of the loss function with respect to weights, shifting weights in the negative gradient direction." },
    { q: "What is the role of activations functions?", a: "Inject non-linear functions (like ReLU) into models, enabling neural networks to learn complex curves." },
    { q: "What does the PyTorch autograd engine do?", a: "Tracks model calculations inside a graph, automatically computing derivatives via backpropagation when `loss.backward()` is called." },
    { q: "Explain static word embeddings.", a: "Map words to multi-dimensional vectors (like Word2Vec) where semantic similarity is represented by close coordinate paths." },
    { q: "Explain vanishing gradients in RNNs.", a: "RNN feedback loops multiply gradients across sequence frames. For long texts, gradients decay to zero, stopping learning." },
    { q: "How do LSTMs prevent vanishing gradients?", a: "They use cell state paths protected by forget and write gates, allowing gradient signals to flow without decay." },
    { q: "Write the self-attention formula.", a: "$Attention(Q, K, V) = Softmax(\\frac{Q K^T}{\\sqrt{d_k}}) V$" },
    { q: "Why divide by $\\sqrt{d_k}$ in attention?", a: "Scaled attention prevents dot-products from growing too large in high dimensions, keeping softmax gradients stable." },
    { q: "Encoder vs Decoder blocks", a: "Encoders calculate context-aware bidirectional features. Decoders generate tokens sequentially, masking future tokens." },
    { q: "Explain Multi-Head Attention.", a: "Splits Queries, Keys, and Values into multiple projections, calculating attention in parallel across different semantic contexts." },
    { q: "What is tokenization BPE?", a: "Byte-Pair Encoding tokenizes text by scanning strings and iteratively merging the most frequent character pairs together." },
    { q: "What does model regularization (L1/L2) do?", a: "Applies penalty values to weights inside loss calculations to prevent weights from growing too large, reducing overfitting." },
    { q: "Compare supervised vs unsupervised learning.", a: "Supervised trains on labelled outputs (classification). Unsupervised learns structures from unlabelled features (clustering)." }
  ],
  9: [
    { q: "What is Chain-of-Thought (CoT)?", a: "A prompt engineering pattern directing the model to output step-by-step reasoning logic before writing the final answer." },
    { q: "Explain few-shot prompt injection.", a: "Provide target input/output examples inside context prompts to guide model responses without fine-tuning." },
    { q: "What is semantic chunking?", a: "Splitting text documents based on semantic content shifts (e.g. paragraphs) rather than hard character bounds, keeping contexts clean." },
    { q: "Explain vector store indexing HNSW.", a: "Hierarchical Navigable Small World indexes vector spaces using layered graphs to speed up similarity queries to logarithmic time." },
    { q: "How does RAG context injection work?", a: "Retrieve relevant document chunks, format them as text, inject them into prompt contexts, and ask the LLM to generate answers." },
    { q: "What is the ReAct loop?", a: "Reasoning and Acting. The LLM outputs thoughts, decides to execute an action tool, reads observations, and cycles until finished." },
    { q: "Detail LangGraph node routing.", a: "LangGraph maps agent nodes (code) and edges (routes) inside state machines, updating a shared State dictionary." },
    { q: "How do you prevent agent loop crashes?", a: "Implement loop limit counters (e.g. max 5 iterations) and wrap tool executions in exception handling blocks." },
    { q: "Compare dense vs sparse search index lists.", a: "Dense (vectors) checks semantic meanings. Sparse (BM25/TF-IDF) checks exact keyword matches. Hybrid models join both." },
    { q: "What is LLM tool calling structure?", a: "The LLM identifies a tool call, outputs a structured JSON object containing arguments, and stops generation to let the server execute the tool." },
    { q: "What is LLM hallucination?", a: "When models output facts that are incorrect or unsupported by training data, often caused by lack of relevant context." },
    { q: "What does LangGraph's checkpointer do?", a: "Saves agent state snapshots after node runs, enabling memory persistence, rollback debugging, and human-in-the-loop gates." },
    { q: "Explain hybrid search RRF.", a: "Reciprocal Rank Fusion merges search lists from vector similarity and keyword engines to output a high-accuracy result list." },
    { q: "Why are vector databases persistent?", a: "They save coordinate indexes to disk, avoiding expensive re-embedding runs when applications restart." },
    { q: "What is prompt formatting template validation?", a: "Using tools like Pydantic to verify LLM API text returns match strict JSON schemas before parsing." }
  ],
  10: [
    { q: "Explain Server-Sent Events (SSE).", a: "Standard HTTP protocol enabling servers to push token chunks dynamically to clients over a single open connection." },
    { q: "How to run RAG Faithfulness evaluations?", a: "Query a secondary LLM to check if the generated answer statements are fully supported by the retrieved context chunks." },
    { q: "Compare SSE vs WebSockets for chats.", a: "SSE is unidirectional (server-to-client) and runs on standard HTTP. WebSockets are bidirectional and require custom protocols." },
    { q: "What is RAG Answer Relevance?", a: "Measures if the generated answer actually addresses the user's question, checked by generating questions from answers and comparing them." },
    { q: "What are timed mock strategy steps?", a: "5m constraint checks, 10m layout designs, 20m code implementation, 10m test runs checking boundary edge cases." },
    { q: "STAR story format guidelines", a: "Situation (context), Task (goal), Action (what you did technically), Result (quantified business or scaling impacts)." },
    { q: "How do CDNs handle event streaming?", a: "Must be configured to bypass chunk buffering (set headers `Cache-Control: no-cache` and `X-Accel-Buffering: no`), streaming bytes directly." },
    { q: "What is approximate nearest neighbor (ANN)?", a: "Search algorithms (like HNSW) that locate close vectors rapidly, sacrificing absolute accuracy for speed." },
    { q: "Explain RAG vector space metadata filters.", a: "Filters out vector rows by tags (e.g. user_id or date) *before* executing vector similarity scans, keeping queries fast." },
    { q: "How does LangGraph supervisor node organize workers?", a: "The supervisor reads the current state, decides which agent worker node to call next, and routes state control to it." },
    { q: "How to secure tool calling agents from executing harmful shell commands?", a: "Sanitize arguments, run code in sandboxed containers, and enforce human approval gates on writes." },
    { q: "What is prompt versioning?", a: "Tracking prompts in git or registry tools to ensure update runs do not cause model output regressions." },
    { q: "Describe cosine distance calculation math.", a: "$CosineDistance = 1 - CosineSimilarity$, ranging between 0 (identical) and 2 (opposite)." },
    { q: "How do you evaluate multi-agent system performance?", a: "Run simulations against benchmark test suites, logging task completion rates and token counts." },
    { q: "What is the target F1 score for production AI pipelines?", a: "Usually targets F1 > 0.85 on test sets before models are deployed to users." }
  ]
};

export default function LearningPage() {
  const settings = useSettingsStore((s) => s.settings);
  const currentWeek = getCurrentWeekNumber(settings.startDate);
  const topicProgress = useProgressStore((s) => s.topicProgress);
  const markTopicStatus = useProgressStore((s) => s.markTopicStatus);
  const updateTopicConfidence = useProgressStore((s) => s.updateTopicConfidence);
  const updateTopicNotes = useProgressStore((s) => s.updateTopicNotes);
  const addRevisionItem = useRevisionStore((s) => s.addRevisionItem);

  const attempts = useProblemsStore((s) => s.attempts);
  const updateProblemStatus = useProblemsStore((s) => s.updateStatus);

  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'concept' | 'labs' | 'resources' | 'notes' | 'interview'>('overview');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const weekTopics = useMemo(
    () => roadmapTopics.filter(t => t.weekNumber === selectedWeek).sort((a, b) => a.dayNumber - b.dayNumber),
    [selectedWeek]
  );

  const selectedTopic = selectedTopicId
    ? roadmapTopics.find(t => t.id === selectedTopicId)
    : weekTopics[0];

  const topicProg = selectedTopic ? topicProgress[selectedTopic.id] : undefined;

  const handleComplete = (topicId: string) => {
    markTopicStatus(topicId, 'completed');
    addRevisionItem(topicId, todayISO());
  };

  const dayNames = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Query LeetCode problems matching current day
  const topicProblems = useMemo(() => {
    if (!selectedTopic) return [];
    return leetcodeProblems.filter(p => p.topicId === selectedTopic.id);
  }, [selectedTopic]);

  // Query resources matching current week
  const weekResources = useMemo(() => {
    return learningResources.filter(r => r.weekNumber === selectedWeek);
  }, [selectedWeek]);

  // Query project matching current week
  const weekProject = useMemo(() => {
    return portfolioProjects.find(p => p.weekNumber === selectedWeek);
  }, [selectedWeek]);

  // Week titles
  const weekTitles: Record<number, string> = {
    1: 'Python Mastery + CS Fundamentals',
    2: 'DSA Part 1 — Arrays, Strings, Hashing, Recursion',
    3: 'DSA Part 2 — Linked Lists, Stacks, Queues, Trees',
    4: 'DSA Part 3 — Graphs, Backtracking, DP',
    5: 'Backend Engineering — FastAPI, REST, Auth, PostgreSQL',
    6: 'Backend Engineering — Redis, Celery, Docker, Microservices',
    7: 'System Design — LLD, HLD, Scalability',
    8: 'ML + Deep Learning + NLP Fundamentals',
    9: 'LLM Engineering — APIs, RAG, Vector DBs, Agents',
    10: 'Production AI Engineering + Interview Sprint'
  };

  const currentFlashcards = weeklyFlashcards[selectedWeek] || [];

  const handleProblemStatusCycle = (problemId: string) => {
    const attempt = attempts[problemId];
    const currentStatus = attempt?.status || 'unsolved';
    const cycle: Record<string, 'unsolved' | 'attempted' | 'solved' | 'mastered'> = {
      unsolved: 'attempted',
      attempted: 'solved',
      solved: 'mastered',
      mastered: 'unsolved'
    };
    updateProblemStatus(problemId, cycle[currentStatus]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-brand-primary" />
          Learning Hub
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Week {selectedWeek}: {weekTitles[selectedWeek] || 'FAANG AI Engineer Syllabus'}
        </p>
      </div>

      {/* Week Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(week => {
          const wTopics = roadmapTopics.filter(t => t.weekNumber === week);
          const completedCount = wTopics.filter(t => topicProgress[t.id]?.status === 'completed').length;
          const isCurrentWeek = week === currentWeek;
          const isSelected = week === selectedWeek;
          const allDone = completedCount === wTopics.length && wTopics.length > 0;

          return (
            <button
              key={week}
              onClick={() => { 
                setSelectedWeek(week); 
                setSelectedTopicId(null); 
                setFlashcardIndex(0); 
                setIsFlipped(false);
                setActiveTab('overview');
              }}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300
                ${isSelected
                  ? 'bg-brand-primary/20 border-brand-primary text-text-primary shadow-[0_0_15px_rgba(99,102,241,0.25)]'
                  : isCurrentWeek
                    ? 'bg-bg-surface border-border-accent text-brand-primary'
                    : allDone
                      ? 'bg-accent-success/10 border-accent-success/30 text-accent-success'
                      : 'bg-bg-surface border-border-default text-text-muted hover:text-text-primary hover:border-border-accent'
                }`}
            >
              Week {week}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar — Daily Lessons */}
        <div className="lg:w-80 shrink-0 space-y-2">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-1">
            Weekly Schedule
          </h3>
          <div className="space-y-2">
            {weekTopics.map(topic => {
              const prog = topicProgress[topic.id];
              const isActive = selectedTopic?.id === topic.id;
              const isCompleted = prog?.status === 'completed';

              return (
                <button
                  key={topic.id}
                  onClick={() => { setSelectedTopicId(topic.id); setNotesText(prog?.notes || ''); }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3
                    ${isActive
                      ? 'bg-brand-primary/10 border-brand-primary/40 shadow-inner'
                      : 'bg-bg-surface border-border-subtle hover:border-border-default'
                    }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-success mt-1 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-text-muted mt-1 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-extrabold text-brand-primary uppercase tracking-wider">
                        {dayNames[topic.dayNumber]}
                      </span>
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${categoryColors[topic.category]}15`,
                          color: categoryColors[topic.category],
                        }}
                      >
                        {topic.category}
                      </span>
                    </div>
                    <p className={`text-sm font-semibold leading-tight ${isCompleted ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                      {topic.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${difficultyColors[topic.difficulty]}15`,
                          color: difficultyColors[topic.difficulty],
                        }}
                      >
                        {topic.difficulty}
                      </span>
                      <span className="text-[10px] text-text-muted flex items-center gap-0.5">
                        <Clock className="w-3 h-3" /> {topic.estimatedHours}h
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content Pane */}
        <div className="flex-1 min-w-0">
          {selectedTopic ? (
            <motion.div
              key={selectedTopic.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Active Topic Summary */}
              <div className="surface-card-static p-6 rounded-2xl border border-border-default space-y-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                      {selectedTopic.title}
                    </h2>
                    <p className="text-sm text-text-secondary mt-1.5">{selectedTopic.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (topicProg?.status === 'completed') {
                        markTopicStatus(selectedTopic.id, 'not_started');
                      } else {
                        handleComplete(selectedTopic.id);
                      }
                    }}
                    className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                      ${topicProg?.status === 'completed'
                        ? 'bg-accent-success/15 text-accent-success border border-accent-success/30'
                        : 'bg-brand-primary text-white hover:bg-brand-primary-hover shadow-lg shadow-brand-primary/10'
                      }`}
                  >
                    {topicProg?.status === 'completed' ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </div>

                {/* Performance & Confidence */}
                <div className="flex items-center gap-6 pt-2 border-t border-border-subtle">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">Confidence:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(level => (
                        <button
                          key={level}
                          onClick={() => updateTopicConfidence(selectedTopic.id, level)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              (topicProg?.confidenceLevel || 0) >= level
                                ? 'text-accent-warning fill-accent-warning'
                                : 'text-text-muted'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="flex border-b border-border-default overflow-x-auto scrollbar-hide">
                {[
                  { id: 'overview', label: 'Day Plan', icon: ListTodo },
                  { id: 'concept', label: 'Concept Notes', icon: BookMarked },
                  { id: 'labs', label: 'Labs & Practice', icon: Code },
                  { id: 'resources', label: 'Resources', icon: Video },
                  { id: 'notes', label: 'Cheat Sheet & Flashcards', icon: Layers },
                  { id: 'interview', label: 'Interview Prep', icon: HelpCircle }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-5 py-3 text-xs font-bold border-b-2 transition-all shrink-0
                        ${isActive 
                          ? 'border-brand-primary text-brand-primary' 
                          : 'border-transparent text-text-muted hover:text-text-secondary'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="min-h-[250px]">
                {/* 1. OVERVIEW & SCHEDULE */}
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <div className="surface-card-static p-5 space-y-3">
                      <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-brand-primary" />
                        Daily Learning Objective
                      </h4>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        Spend {selectedTopic.estimatedHours} hours today mastering this area. Review documentation references and solve practice problems.
                      </p>
                    </div>

                    {selectedTopic.prerequisites.length > 0 && (
                      <div className="surface-card-static p-5">
                        <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Prerequisites</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedTopic.prerequisites.map(prereqId => {
                            const pre = roadmapTopics.find(t => t.id === prereqId);
                            return (
                              <span key={prereqId} className="text-xs px-2.5 py-1 rounded bg-bg-secondary text-text-secondary border border-border-subtle">
                                {pre ? pre.title : prereqId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {weekProject && (
                      <div className="surface-card-static p-5 bg-gradient-to-br from-brand-primary/5 to-transparent border-l-4 border-brand-primary">
                        <h4 className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-1">Weekly Mini Project Connection</h4>
                        <h3 className="text-sm font-bold text-text-primary">{weekProject.title}</h3>
                        <p className="text-xs text-text-secondary mt-1">{weekProject.description}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. CONCEPT NOTES */}
                {activeTab === 'concept' && (
                  <div className="surface-card-static p-6 markdown-content">
                    {selectedTopic.learningContent ? (
                      <ReactMarkdown>{selectedTopic.learningContent}</ReactMarkdown>
                    ) : (
                      <p className="text-sm text-text-muted">No conceptual notes written for this topic yet.</p>
                    )}
                  </div>
                )}

                {/* 3. LABS & PRACTICE */}
                {activeTab === 'labs' && (
                  <div className="space-y-6">
                    {selectedTopic.labDescription && (
                      <div className="surface-card-static p-6 markdown-content">
                        <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                          <Code className="w-4 h-4 text-brand-primary" />
                          Hands-on Coding Lab
                        </h3>
                        <ReactMarkdown>{selectedTopic.labDescription}</ReactMarkdown>
                      </div>
                    )}

                    {/* LeetCode Problems */}
                    <div className="surface-card-static p-6 space-y-4">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <ListTodo className="w-4 h-4 text-brand-primary" />
                        LeetCode Practice Problems
                      </h3>
                      {topicProblems.length > 0 ? (
                        <div className="space-y-2">
                          {topicProblems.map(prob => {
                            const attempt = attempts[prob.id];
                            const status = attempt?.status || 'unsolved';
                            const statusLabel: Record<string, string> = {
                              unsolved: 'Unsolved',
                              attempted: 'Attempted',
                              solved: 'Solved',
                              mastered: 'Mastered'
                            };
                            return (
                              <div key={prob.id} className="flex items-center justify-between p-3 rounded-lg bg-bg-secondary border border-border-subtle hover:border-border-default transition-colors">
                                <div className="min-w-0 flex-1">
                                  <a 
                                    href={prob.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sm font-semibold text-text-primary hover:text-brand-primary transition-colors flex items-center gap-1.5"
                                  >
                                    #{prob.leetcodeNumber} - {prob.title}
                                    <ExternalLink className="w-3 h-3 text-text-muted" />
                                  </a>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span 
                                      className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                                      style={{
                                        backgroundColor: `${difficultyColors[prob.difficulty]}15`,
                                        color: difficultyColors[prob.difficulty]
                                      }}
                                    >
                                      {prob.difficulty}
                                    </span>
                                    {prob.patterns.map(pat => (
                                      <span key={pat} className="text-[9px] text-text-muted bg-bg-surface px-1.5 py-0.5 rounded">
                                        {pat}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleProblemStatusCycle(prob.id)}
                                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-bold transition-all
                                    ${status === 'solved' || status === 'mastered'
                                      ? 'bg-accent-success/15 border-accent-success/30 text-accent-success'
                                      : status === 'attempted'
                                        ? 'bg-accent-warning/15 border-accent-warning/30 text-accent-warning'
                                        : 'bg-bg-surface border-border-default text-text-muted hover:border-border-accent'
                                    }`}
                                >
                                  {statusLabel[status]}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-text-muted">No specific algorithm problems assigned to this day. Focus on implementing the custom coding lab.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. RESOURCES */}
                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    <div className="surface-card-static p-6">
                      <h3 className="text-sm font-bold text-text-primary mb-4 flex items-center gap-2">
                        <Video className="w-4 h-4 text-brand-primary" />
                        Curated Learning Resources
                      </h3>
                      {weekResources.length > 0 ? (
                        <div className="space-y-3">
                          {weekResources.map(res => (
                            <a 
                              key={res.id} 
                              href={res.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="block p-3.5 rounded-xl bg-bg-secondary border border-border-subtle hover:border-brand-primary/40 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-sm font-bold text-text-primary">{res.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] text-text-muted uppercase tracking-wider font-extrabold">{res.type}</span>
                                    {res.estimatedHours && (
                                      <span className="text-[10px] text-text-muted">• {res.estimatedHours} hours</span>
                                    )}
                                  </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-text-muted" />
                              </div>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-text-muted">No resources set for this week.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 5. NOTES & FLASHCARDS */}
                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    {/* Flashcards Panel */}
                    {currentFlashcards.length > 0 && (
                      <div className="surface-card-static p-6 space-y-4">
                        <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-brand-primary" />
                          Spaced Repetition Deck ({flashcardIndex + 1}/{currentFlashcards.length})
                        </h3>

                        {/* 3D-like flip card */}
                        <div 
                          onClick={() => setIsFlipped(!isFlipped)}
                          className="min-h-[160px] bg-bg-secondary border border-border-default rounded-xl p-5 cursor-pointer flex flex-col justify-between hover:border-brand-primary/40 transition-all select-none relative overflow-hidden"
                        >
                          <div className="absolute top-2 right-2 text-[10px] font-bold text-text-muted uppercase tracking-wider">
                            {isFlipped ? "Answer" : "Question"}
                          </div>
                          <div className="flex-1 flex items-center justify-center text-center px-4">
                            <p className="text-sm font-medium leading-relaxed text-text-primary">
                              {isFlipped ? currentFlashcards[flashcardIndex].a : currentFlashcards[flashcardIndex].q}
                            </p>
                          </div>
                          <p className="text-center text-[10px] text-text-muted mt-2">
                            Click card to flip
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => {
                              setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : currentFlashcards.length - 1));
                              setIsFlipped(false);
                            }}
                            className="px-3 py-1.5 rounded bg-bg-surface border border-border-default text-xs font-bold text-text-secondary hover:text-text-primary"
                          >
                            Previous
                          </button>
                          <button
                            onClick={() => {
                              setFlashcardIndex((prev) => (prev < currentFlashcards.length - 1 ? prev + 1 : 0));
                              setIsFlipped(false);
                            }}
                            className="px-3 py-1.5 rounded bg-brand-primary text-xs font-bold text-white hover:bg-brand-primary-hover"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Master Cheat Sheet markdown helper */}
                    <div className="surface-card-static p-6 space-y-3">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <Layers className="w-4 h-4 text-brand-primary" />
                        Notes & Cheat Sheet
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Summarize today's core concepts. Use code blocks for Python templates, diagrams, and logging steps.
                      </p>
                      <textarea
                        value={topicProg?.notes || notesText}
                        onChange={(e) => {
                          setNotesText(e.target.value);
                          updateTopicNotes(selectedTopic.id, e.target.value);
                        }}
                        placeholder="Write notes (supports Markdown)..."
                        className="w-full h-40 bg-bg-secondary border border-border-default rounded-xl p-4 text-sm text-text-primary placeholder-text-muted resize-y focus:outline-none focus:border-brand-primary font-mono"
                      />
                    </div>
                  </div>
                )}

                {/* 6. INTERVIEW PREP */}
                {activeTab === 'interview' && (
                  <div className="space-y-4">
                    <div className="surface-card-static p-6 space-y-4">
                      <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-brand-primary" />
                        Common Interview Questions
                      </h3>
                      {selectedTopic.interviewQuestions && selectedTopic.interviewQuestions.length > 0 ? (
                        <div className="space-y-4">
                          {selectedTopic.interviewQuestions.map((q, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-bg-secondary border border-border-subtle space-y-2">
                              <h4 className="text-sm font-bold text-text-primary flex items-start gap-2">
                                <span className="text-brand-primary mt-0.5">Q{idx + 1}.</span>
                                {q}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-text-muted italic">
                                <span>Tested by: FAANG & AI Startups</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-text-muted">No specific interview questions mapped to this lesson.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-text-muted surface-card-static p-8 rounded-2xl border border-border-subtle">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30 text-brand-primary" />
              <p>Select a lesson from the schedule to begin your study.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
