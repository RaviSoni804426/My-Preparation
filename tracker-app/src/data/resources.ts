import { Resource } from '../types';

export const learningResources: Resource[] = [
  // ── Week 1: Python Mastery + CS Fundamentals ──────────────────
  { id: 'r-py-docs', title: 'Python Official Tutorial', type: 'Docs', url: 'https://docs.python.org/3/tutorial', weekNumber: 1, estimatedHours: 6, isCompleted: false },
  { id: 'r-fluent-py', title: 'Fluent Python (Ch 1-5)', type: 'Book', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', weekNumber: 1, estimatedHours: 4, isCompleted: false },
  { id: 'r-ostep-proc', title: 'OSTEP: Processes and Threads', type: 'Book', url: 'https://ostep.org', weekNumber: 1, estimatedHours: 5, isCompleted: false },
  { id: 'r-git-int', title: 'Git Internals Book Chapter', type: 'Docs', url: 'https://git-scm.com/book/en/v2/Git-Internals-Git-Objects', weekNumber: 1, estimatedHours: 2, isCompleted: false },

  // ── Week 2: DSA Part 1 — Arrays, Strings, Hashing, Recursion ──────────────────
  { id: 'r-nc-arrays', title: 'NeetCode Arrays & Strings Playlist', type: 'YouTube', url: 'https://youtube.com/c/NeetCode', weekNumber: 2, estimatedHours: 3, isCompleted: false },
  { id: 'r-lc-arrays', title: 'LeetCode Explore: Arrays 101', type: 'Interactive', url: 'https://leetcode.com/explore/learn/card/fun-with-arrays/', weekNumber: 2, estimatedHours: 2, isCompleted: false },
  { id: 'r-pythontutor', title: 'Python Tutor (Visual Debugger)', type: 'Interactive', url: 'https://pythontutor.com', weekNumber: 2, estimatedHours: 1, isCompleted: false },
  { id: 'r-visualgo-arr', title: 'VisuAlgo (Array Animations)', type: 'Interactive', url: 'https://visualgo.net', weekNumber: 2, estimatedHours: 1, isCompleted: false },

  // ── Week 3: DSA Part 2 — Linked Lists, Stacks, Queues, Trees ──────────────────
  { id: 'r-nc-trees', title: 'NeetCode Trees & Lists Playlist', type: 'YouTube', url: 'https://youtube.com/c/NeetCode', weekNumber: 3, estimatedHours: 4, isCompleted: false },
  { id: 'r-visualgo-bst', title: 'VisuAlgo Binary Search Tree', type: 'Interactive', url: 'https://visualgo.net/en/bst', weekNumber: 3, estimatedHours: 1, isCompleted: false },
  { id: 'r-abdulbari-trees', title: 'Abdul Bari Trees (YouTube)', type: 'YouTube', url: 'https://youtube.com/watch?v=qH6yxkw0u78', weekNumber: 3, estimatedHours: 2, isCompleted: false },

  // ── Week 4: DSA Part 3 — Graphs, Backtracking, Dynamic Programming ──────────────────
  { id: 'r-sd-primer-graphs', title: 'System Design Primer: Graphs', type: 'GitHub', url: 'https://github.com/donnemartin/system-design-primer', weekNumber: 4, estimatedHours: 3, isCompleted: false },
  { id: 'r-nc-dp', title: 'NeetCode Dynamic Programming Playlist', type: 'YouTube', url: 'https://youtube.com/c/NeetCode', weekNumber: 4, estimatedHours: 5, isCompleted: false },
  { id: 'r-mit-ocw-dp', title: 'MIT OCW Dynamic Programming', type: 'Course', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-videos/lecture-19-dynamic-programming-i-fibonacci-shortest-paths/', weekNumber: 4, estimatedHours: 4, isCompleted: false },

  // ── Week 5: Backend Engineering — FastAPI, REST, Auth, PostgreSQL ──────────────────
  { id: 'r-fastapi-tutorial', title: 'FastAPI Official Tutorial', type: 'Docs', url: 'https://fastapi.tiangolo.com/tutorial/', weekNumber: 5, estimatedHours: 6, isCompleted: false },
  { id: 'r-sqlalchemy-async', title: 'SQLAlchemy Async ORM Guide', type: 'Docs', url: 'https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html', weekNumber: 5, estimatedHours: 4, isCompleted: false },
  { id: 'r-lc-sql-50', title: 'LeetCode SQL 50 Study Plan', type: 'Interactive', url: 'https://leetcode.com/studyplan/30-days-of-sql/', weekNumber: 5, estimatedHours: 8, isCompleted: false },

  // ── Week 6: Backend Engineering — Redis, Celery, Docker, Microservices ──────────────────
  { id: 'r-redis-cache', title: 'Redis Caching & Latency Patterns', type: 'Docs', url: 'https://redis.io/docs/manual/client-side-caching/', weekNumber: 6, estimatedHours: 3, isCompleted: false },
  { id: 'r-celery-async', title: 'Celery Background Task Workers Guide', type: 'Docs', url: 'https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html', weekNumber: 6, estimatedHours: 4, isCompleted: false },
  { id: 'r-docker-best', title: 'Docker Image Layering Best Practices', type: 'Docs', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', weekNumber: 6, estimatedHours: 3, isCompleted: false },

  // ── Week 7: System Design — LLD, HLD, Scalability ──────────────────
  { id: 'r-refactoring-guru', title: 'Refactoring.Guru Design Patterns', type: 'Docs', url: 'https://refactoring.guru', weekNumber: 7, estimatedHours: 6, isCompleted: false },
  { id: 'r-sd-primer-hld', title: 'System Design Primer (High Level)', type: 'GitHub', url: 'https://github.com/donnemartin/system-design-primer', weekNumber: 7, estimatedHours: 8, isCompleted: false },
  { id: 'r-ddia-scale', title: 'Designing Data-Intensive Applications', type: 'Book', url: 'https://dataintensive.net', weekNumber: 7, estimatedHours: 15, isCompleted: false },
  { id: 'r-bytebytego-hld', title: 'ByteByteGo Scalability Newsletters', type: 'Blog', url: 'https://blog.bytebytego.com', weekNumber: 7, estimatedHours: 4, isCompleted: false },

  // ── Week 8: ML + Deep Learning + NLP Fundamentals ──────────────────
  { id: 'r-pytorch-quick', title: 'PyTorch Autograd Quickstart', type: 'Docs', url: 'https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html', weekNumber: 8, estimatedHours: 4, isCompleted: false },
  { id: 'r-karpathy-gpt', title: 'Andrej Karpathy nanoGPT Playlist', type: 'YouTube', url: 'https://youtube.com/@karpathy', weekNumber: 8, estimatedHours: 8, isCompleted: false },
  { id: 'r-illustrated-trans', title: 'The Illustrated Transformer Blog', type: 'Blog', url: 'https://jalammar.github.io/illustrated-transformer/', weekNumber: 8, estimatedHours: 2, isCompleted: false },

  // ── Week 9: LLM Engineering — APIs, RAG, Vector DBs, Agents ──────────────────
  { id: 'r-anthropic-prompts', title: 'Anthropic Prompt Engineering Guide', type: 'Docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering', weekNumber: 9, estimatedHours: 2, isCompleted: false },
  { id: 'r-chromadb-guide', title: 'ChromaDB Local Vector Storage Docs', type: 'Docs', url: 'https://docs.trychroma.com', weekNumber: 9, estimatedHours: 2, isCompleted: false },
  { id: 'r-langgraph-states', title: 'LangGraph State Orchestrators Guide', type: 'Docs', url: 'https://langchain-ai.github.io/langgraph/', weekNumber: 9, estimatedHours: 4, isCompleted: false },

  // ── Week 10: Production AI Engineering + Interview Sprint ──────────────────
  { id: 'r-fastapi-sse', title: 'FastAPI Server-Sent Events (Streaming)', type: 'Docs', url: 'https://fastapi.tiangolo.com/advanced/custom-response/#streamingresponse', weekNumber: 10, estimatedHours: 3, isCompleted: false },
  { id: 'r-ragas-eval', title: 'Ragas RAG Evaluation Framework Guide', type: 'Docs', url: 'https://docs.ragas.io', weekNumber: 10, estimatedHours: 4, isCompleted: false },
  { id: 'r-google-preps', title: 'Google Technical Interview Hiring Guide', type: 'Docs', url: 'https://careers.google.com/how-we-hire/', weekNumber: 10, estimatedHours: 2, isCompleted: false },
];
