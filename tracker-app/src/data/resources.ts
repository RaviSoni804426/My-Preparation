import { Resource } from '../types';

export const learningResources: Resource[] = [
  // ── Week 1: Python ────────────────────────────
  { id: 'r-py-docs', title: 'Python Official Tutorial', type: 'Docs', url: 'https://docs.python.org/3/tutorial', weekNumber: 1, estimatedHours: 6, isCompleted: false },
  { id: 'r-corey', title: 'Corey Schafer Python (Videos 1–20)', type: 'YouTube', url: 'https://youtube.com/c/CoreySchafer', weekNumber: 1, estimatedHours: 5, isCompleted: false },
  { id: 'r-fluent-py', title: 'Fluent Python (Ch 1–5)', type: 'Book', url: 'https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/', weekNumber: 1, estimatedHours: 4, isCompleted: false },
  { id: 'r-bigo', title: 'CS Dojo Big O Notation', type: 'YouTube', url: 'https://youtube.com/watch?v=D6xkbGLQesk', weekNumber: 1, estimatedHours: 1, isCompleted: false },
  { id: 'r-ctci', title: 'Cracking the Coding Interview', type: 'Book', url: 'https://www.crackingthecodinginterview.com', weekNumber: 1, estimatedHours: 20, isCompleted: false },

  // ── Week 2: Arrays & Strings ──────────────────
  { id: 'r-nc-arrays', title: 'NeetCode Arrays & Strings Playlist', type: 'YouTube', url: 'https://youtube.com/c/NeetCode', weekNumber: 2, estimatedHours: 3, isCompleted: false },
  { id: 'r-lc-arrays', title: 'LeetCode Explore: Arrays 101', type: 'Interactive', url: 'https://leetcode.com/explore/learn/card/fun-with-arrays/', weekNumber: 2, estimatedHours: 2, isCompleted: false },
  { id: 'r-pythontutor', title: 'Python Tutor (Visual Debugger)', type: 'Interactive', url: 'https://pythontutor.com', weekNumber: 2, isCompleted: false },
  { id: 'r-visualgo', title: 'VisuAlgo (Array Animations)', type: 'Interactive', url: 'https://visualgo.net', weekNumber: 2, isCompleted: false },

  // ── Week 5: Trees & Graphs ──────────────────────────
  { id: 'r-nc-trees', title: 'NeetCode Trees Playlist', type: 'YouTube', url: 'https://youtube.com/c/NeetCode', weekNumber: 5, estimatedHours: 3, isCompleted: false },
  { id: 'r-visualgo-bst', title: 'VisuAlgo BST', type: 'Interactive', url: 'https://visualgo.net/en/bst', weekNumber: 5, isCompleted: false },
  { id: 'r-abdulbari', title: 'Abdul Bari Trees (YouTube)', type: 'YouTube', url: 'https://youtube.com/watch?v=qH6yxkw0u78', weekNumber: 5, estimatedHours: 2, isCompleted: false },

  // ── Week 7: OS + Networking + DB ───────────────────
  { id: 'r-ostep', title: 'OS: Three Easy Pieces', type: 'Book', url: 'https://ostep.org', weekNumber: 7, estimatedHours: 10, isCompleted: false },
  { id: 'r-mdn-http', title: 'MDN Web Docs: HTTP', type: 'Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', weekNumber: 7, estimatedHours: 3, isCompleted: false },
  { id: 'r-hussein', title: 'Hussein Nasser Networking (YouTube)', type: 'YouTube', url: 'https://youtube.com/c/HusseinNasser', weekNumber: 7, estimatedHours: 4, isCompleted: false },
  { id: 'r-cloudflare', title: 'Cloudflare Learning Center', type: 'Blog', url: 'https://cloudflare.com/learning', weekNumber: 7, estimatedHours: 3, isCompleted: false },

  // ── Week 8: FastAPI & Backend ──────────────────────────
  { id: 'r-fastapi', title: 'FastAPI Official Tutorial', type: 'Docs', url: 'https://fastapi.tiangolo.com', weekNumber: 8, estimatedHours: 6, isCompleted: false },
  { id: 'r-sqlalchemy', title: 'SQLAlchemy ORM Docs', type: 'Docs', url: 'https://docs.sqlalchemy.org', weekNumber: 8, estimatedHours: 4, isCompleted: false },
  { id: 'r-jwtio', title: 'JWT.io (Debugger)', type: 'Interactive', url: 'https://jwt.io', weekNumber: 8, isCompleted: false },
  { id: 'r-arjan', title: 'Arjan Codes (YouTube)', type: 'YouTube', url: 'https://youtube.com/c/ArjanCodes', weekNumber: 8, estimatedHours: 3, isCompleted: false },

  // ── Week 9: System Design LLD & HLD ──────────────────
  { id: 'r-refactoring', title: 'Refactoring.Guru Design Patterns', type: 'Docs', url: 'https://refactoring.guru', weekNumber: 9, estimatedHours: 6, isCompleted: false },
  { id: 'r-grokking-ood', title: 'Grokking the OOD Interview', type: 'Course', url: 'https://educative.io', weekNumber: 9, estimatedHours: 8, isCompleted: false },
  { id: 'r-ddia', title: 'Designing Data-Intensive Applications (DDIA)', type: 'Book', url: 'https://dataintensive.net', weekNumber: 9, estimatedHours: 20, isCompleted: false },
  { id: 'r-sd-primer', title: 'System Design Primer (GitHub)', type: 'GitHub', url: 'https://github.com/donnemartin/system-design-primer', weekNumber: 9, estimatedHours: 10, isCompleted: false },
  { id: 'r-bytebytego', title: 'ByteByteGo Newsletter + Book', type: 'Blog', url: 'https://blog.bytebytego.com', weekNumber: 9, estimatedHours: 6, isCompleted: false },
  { id: 'r-nc-sd', title: 'NeetCode System Design', type: 'YouTube', url: 'https://youtube.com/c/NeetCode', weekNumber: 9, estimatedHours: 5, isCompleted: false },
  { id: 'r-alex-xu', title: 'System Design Interview Vol 1+2 (Alex Xu)', type: 'Book', url: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF', weekNumber: 9, estimatedHours: 15, isCompleted: false },

  // ── Week 10: AI Engineering ────────────────────
  { id: 'r-statquest', title: 'StatQuest (Josh Starmer)', type: 'YouTube', url: 'https://youtube.com/c/joshstarmer', weekNumber: 10, estimatedHours: 6, isCompleted: false },
  { id: 'r-3b1b', title: '3Blue1Brown Linear Algebra', type: 'YouTube', url: 'https://youtube.com/c/3blue1brown', weekNumber: 10, estimatedHours: 4, isCompleted: false },
  { id: 'r-handson-ml', title: 'Hands-On ML (Géron)', type: 'Book', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125974/', weekNumber: 10, estimatedHours: 15, isCompleted: false },
  { id: 'r-kaggle', title: 'Kaggle Learn', type: 'Interactive', url: 'https://kaggle.com/learn', weekNumber: 10, estimatedHours: 6, isCompleted: false },
  { id: 'r-karpathy', title: 'Andrej Karpathy (makemore, nanoGPT)', type: 'YouTube', url: 'https://youtube.com/@karpathy', weekNumber: 10, estimatedHours: 8, isCompleted: false },
  { id: 'r-hf-course', title: 'HuggingFace NLP Course', type: 'Course', url: 'https://huggingface.co/course', weekNumber: 10, estimatedHours: 8, isCompleted: false },
  { id: 'r-illustrated', title: 'The Illustrated Transformer', type: 'Blog', url: 'https://jalammar.github.io/illustrated-transformer/', weekNumber: 10, estimatedHours: 2, isCompleted: false },
  { id: 'r-fastai', title: 'Fast.ai Practical Deep Learning', type: 'Course', url: 'https://course.fast.ai', weekNumber: 10, estimatedHours: 10, isCompleted: false },
  { id: 'r-langchain', title: 'LangChain Docs', type: 'Docs', url: 'https://docs.langchain.com', weekNumber: 10, estimatedHours: 5, isCompleted: false },
  { id: 'r-langgraph', title: 'LangGraph Docs', type: 'Docs', url: 'https://langchain-ai.github.io/langgraph', weekNumber: 10, estimatedHours: 4, isCompleted: false },
  { id: 'r-llamaindex', title: 'LlamaIndex Docs', type: 'Docs', url: 'https://docs.llamaindex.ai', weekNumber: 10, estimatedHours: 3, isCompleted: false },
  { id: 'r-openai-cookbook', title: 'OpenAI Cookbook', type: 'GitHub', url: 'https://github.com/openai/openai-cookbook', weekNumber: 10, estimatedHours: 4, isCompleted: false },
  { id: 'r-dlai', title: 'DeepLearning.AI Short Courses', type: 'Course', url: 'https://deeplearning.ai/short-courses', weekNumber: 10, estimatedHours: 6, isCompleted: false },
  { id: 'r-anthropic', title: 'Anthropic Prompt Engineering Guide', type: 'Docs', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering', weekNumber: 10, estimatedHours: 2, isCompleted: false },
];
