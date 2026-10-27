import { AILevel, UserProgress, Achievement } from '../types';

export const AI_CURRICULUM: AILevel[] = [
  {
    id: 1,
    title: "LEVEL 1 — Basics",
    subtitle: "Foundational AI, LLM fundamentals, IBM GenAI, Responsible AI & Anthropic Fluency",
    badge: "🌱 Level 1",
    description: "Build a rock-solid understanding of the AI/ML landscape, large language models, ethical considerations, and human-AI collaboration.",
    themeColor: "emerald",
    chapters: [
      {
        id: "ch1",
        number: 1,
        title: "1. Google Introduction to Generative AI",
        description: "Learn the AI, ML, deep-learning, and generative-AI landscape.",
        color: "emerald",
        accentGradient: "from-emerald-500 to-teal-600",
        nodes: [
          {
            id: "c1_google_genai",
            title: "Google Introduction to Generative AI",
            subtitle: "Google Cloud Skills Boost",
            provider: "Google",
            externalUrl: "https://www.cloudskillsboost.google/course_templates/536",
            type: "concept",
            xpReward: 30,
            durationMinutes: 45,
            iconName: "Brain",
            conceptSummary: "Learn what Generative AI is, how it differs from traditional machine learning, and how generative models generate new data like text, images, and audio.",
            keyTopics: ["Gen AI vs Traditional ML", "Discriminative vs Generative Models", "Foundation Models"],
            fallbackQuestions: [
              {
                id: "q1_1",
                question: "What primary architectural distinction separates Generative AI models from Discriminative AI models?",
                options: [
                  "Generative models learn joint probability distribution P(X, Y) to create new data, while Discriminative models learn conditional probability P(Y|X) to classify data.",
                  "Generative models only classify spam labels while Discriminative models generate raw images.",
                  "Generative models do not require any training data, whereas Discriminative models require quantum hardware.",
                  "Generative models run exclusively on relational SQL databases."
                ],
                correctIndex: 0,
                explanation: "Discriminative models draw decision boundaries to classify existing data, whereas Generative models model the underlying data distribution to synthesize new realistic instances."
              },
              {
                id: "q1_2",
                question: "In deep learning for generative text, what is a Foundation Model?",
                options: [
                  "A massive pre-trained model trained on broad multimodal datasets at scale that can be adapted to diverse downstream tasks.",
                  "A small CSS stylesheet used for basic web site design.",
                  "A basic SQL database schema containing 10 static rows.",
                  "A rule-based IF-ELSE decision script manually coded in C++."
                ],
                correctIndex: 0,
                explanation: "Foundation models (like Gemini or PaLM) are trained on vast datasets and serve as the base that can be prompted or fine-tuned for many applications."
              },
              {
                id: "q1_3",
                question: "How does parameter Fine-Tuning differ from Prompt Engineering in Generative AI?",
                options: [
                  "Fine-tuning updates internal model weights via backpropagation, whereas prompt engineering crafts input context without changing model weights.",
                  "Prompt engineering requires retraining the full neural network on supercomputers.",
                  "Fine-tuning deletes the model vocabulary while prompt engineering adds new hardware GPUs.",
                  "Both processes perform identical binary file replacements on the operating system."
                ],
                correctIndex: 0,
                explanation: "Prompt engineering optimizes instructions and context in the input prompt; fine-tuning modifies the internal weights of the neural network on specialized data."
              },
              {
                id: "q1_4",
                question: "What is the primary role of a Causal (Decoder-Only) Transformer architecture in text generation?",
                options: [
                  "Predicting the next token autoregressively using attention masks so tokens cannot attend to future positions.",
                  "Translating static web pages into 3D graphics.",
                  "Compressing audio files into zip archives.",
                  "Executing operating system kernel processes."
                ],
                correctIndex: 0,
                explanation: "Decoder-only models (like Gemini and GPT) use masked self-attention to generate tokens sequentially by predicting the highest probability next token."
              },
              {
                id: "q1_5",
                question: "What is the primary root cause of 'hallucinations' in Generative AI language models?",
                options: [
                  "The model generates statistically plausible token sequences based on weights without an intrinsic factual validation mechanism.",
                  "The computer processor overheating above 90 degrees Celsius.",
                  "A virus infection inside the operating system.",
                  "A lack of Internet access during static inference execution."
                ],
                correctIndex: 0,
                explanation: "LLMs optimize for word probability alignment rather than truth verification, leading them to confidently construct false assertions when context is missing."
              },
              {
                id: "q1_6",
                question: "How do Multimodal Generative AI models handle text and image inputs simultaneously?",
                options: [
                  "They project vision and text token representations into a shared multi-dimensional vector embedding space.",
                  "They convert text to ASCII numbers and images to JPEG strings without neural alignment.",
                  "They execute two completely disconnected programs in separate browser windows.",
                  "They translate all images into text captions using OCR before processing."
                ],
                correctIndex: 0,
                explanation: "Multimodal architectures (like Gemini) map diverse modalities into a unified embedding space where visual and textual concepts interact directly."
              },
              {
                id: "q1_7",
                question: "In Generative AI model training, what is the purpose of RLHF (Reinforcement Learning from Human Feedback)?",
                options: [
                  "Aligning model generations with human preferences for safety, helpfulness, and factual accuracy using reward models.",
                  "Increasing the raw download speed of model checkpoint files.",
                  "Replacing neural network backpropagation with manual human typing.",
                  "Enabling the model to operate without electricity."
                ],
                correctIndex: 0,
                explanation: "RLHF uses human preference rankings to fine-tune model policies via algorithms like PPO or DPO, suppressing harmful or evasive outputs."
              },
              {
                id: "q1_8",
                question: "What effect does increasing the 'Temperature' hyperparameter have on LLM generation sampling?",
                options: [
                  "It flattens the logit probability distribution, leading to more diverse and creative token choices.",
                  "It causes the computer fan to run faster.",
                  "It forces the model to pick only the single top candidate token every time.",
                  "It truncates the prompt to 10 tokens."
                ],
                correctIndex: 0,
                explanation: "Higher temperature scales logits before softmax, increasing randomness; lower temperature makes generations deterministic (greedy search)."
              },
              {
                id: "q1_9",
                question: "What is Nucleus (Top-P) sampling in generative language models?",
                options: [
                  "Sampling from the smallest subset of candidate tokens whose cumulative probability reaches threshold P.",
                  "Selecting tokens based on alphabetical order.",
                  "Sampling only tokens starting with uppercase letters.",
                  "Filtering tokens that contain more than 3 vowels."
                ],
                correctIndex: 0,
                explanation: "Top-P sampling dynamically adjusts the candidate token pool based on the cumulative probability mass, preventing low-probability outliers while keeping diversity."
              },
              {
                id: "q1_10",
                question: "What is Parameter-Efficient Fine-Tuning (PEFT) such as LoRA (Low-Rank Adaptation)?",
                options: [
                  "Freezing pre-trained base model weights and inserting small trainable low-rank matrices to reduce compute memory.",
                  "Deleting 90% of the layers in a neural network to make it run on mobile phones.",
                  "Training an AI model using only text files smaller than 1 kilobyte.",
                  "Converting neural network weights into plain text spreadsheets."
                ],
                correctIndex: 0,
                explanation: "LoRA decomposes weight update matrices into low-rank representations, allowing fine-tuning with less than 1% of the original trainable parameters."
              }
            ]
          },
          {
            id: "c1_chest",
            title: "Basics Starter Chest",
            subtitle: "Bonus XP & Gems for starting Level 1",
            provider: "Bonus",
            type: "chest",
            xpReward: 25,
            durationMinutes: 1,
            iconName: "Gift",
            conceptSummary: "Claim bonus gems and XP to boost your learning path progress!",
            keyTopics: ["Streak Boost", "XP Bonus"]
          }
        ]
      },
      {
        id: "ch2",
        number: 2,
        title: "2. Google Introduction to Large Language Models",
        description: "Learn what LLMs are and where they are used.",
        color: "emerald",
        accentGradient: "from-emerald-500 to-teal-600",
        nodes: [
          {
            id: "c2_google_llm",
            title: "Google Introduction to LLMs",
            subtitle: "Google Cloud Skills Boost",
            provider: "Google",
            externalUrl: "https://www.cloudskillsboost.google/course_templates/539",
            type: "concept",
            xpReward: 30,
            durationMinutes: 45,
            iconName: "MessageSquare",
            conceptSummary: "Explore Large Language Models (LLMs), how transformer architectures process natural language tokens, prompt tuning, and real-world LLM use cases.",
            keyTopics: ["Tokens & Context Window", "Transformer Architecture", "Prompt Tuning vs Fine-Tuning"],
            fallbackQuestions: [
              {
                id: "q2_1",
                question: "How do LLMs process natural language input text?",
                options: [
                  "They break text down into 'tokens' (word fragments or words) and convert them to numeric vector embeddings.",
                  "They translate every sentence into raw binary machine code directly.",
                  "They look up words in a dictionary spreadsheet.",
                  "They execute python scripts for each vowel."
                ],
                correctIndex: 0,
                explanation: "Tokenization breaks input text into sub-word tokens, which neural network embedding layers turn into dense numerical vectors."
              },
              {
                id: "q2_2",
                question: "What is the role of the 'Context Window' in an LLM?",
                options: [
                  "The maximum number of tokens the model can read and process at one time.",
                  "The operating system window size on your laptop screen.",
                  "The time taken to download the model weights.",
                  "The background color setting of the chat interface."
                ],
                correctIndex: 0,
                explanation: "The context window dictates how much text (prompt + prior conversation history) the LLM can consider when generating its next response."
              }
            ]
          }
        ]
      },
      {
        id: "ch3",
        number: 3,
        title: "3. IBM Getting Started with Generative AI",
        description: "Expand into generative-AI applications, LLMs, and responsible AI.",
        color: "emerald",
        accentGradient: "from-emerald-500 to-teal-600",
        nodes: [
          {
            id: "c3_ibm_genai",
            title: "IBM Getting Started with Gen AI",
            subtitle: "IBM YourLearning",
            provider: "IBM",
            externalUrl: "https://skills.yourlearning.ibm.com/activity/PLAN-BAEFCCAAD520",
            type: "concept",
            xpReward: 35,
            durationMinutes: 60,
            iconName: "Database",
            conceptSummary: "Discover enterprise generative AI applications, model selection, prompt engineering basics, and IBM's framework for trustworthy AI deployment.",
            keyTopics: ["Enterprise Gen AI", "Model Selection Criteria", "Responsible AI Governance"],
            fallbackQuestions: [
              {
                id: "q3_1",
                question: "Why is model governance essential when deploying Generative AI in enterprise environments?",
                options: [
                  "To ensure data privacy, regulatory compliance, auditability, and mitigate hallucination/bias risks.",
                  "To restrict employees from using keyboard shortcuts.",
                  "To increase the electricity consumption of office computers.",
                  "To force all applications to run on single-threaded CPUs."
                ],
                correctIndex: 0,
                explanation: "Governance establishes safeguards for data protection, legal compliance, output verification, and ethical guardrails."
              },
              {
                id: "q3_2",
                question: "What is the primary security risk of submitting proprietary corporate code to unmonitored public LLMs?",
                options: [
                  "Confidential intellectual property could leak into public model corpora or unprivileged completions.",
                  "The corporate computer monitor brightness will dim.",
                  "The server will automatically switch from Python to COBOL.",
                  "The corporate internet bill will double instantly."
                ],
                correctIndex: 0,
                explanation: "Unmonitored API calls or free-tier usage may store inputs for retrain datasets, exposing trade secrets or sensitive PII."
              },
              {
                id: "q3_3",
                question: "How does Model Quantization optimize Generative AI models for enterprise deployment?",
                options: [
                  "By reducing weight precision (e.g. from FP16 to INT8/INT4), lowering memory usage and latency with minimal accuracy loss.",
                  "By deleting 50% of the training text sentences randomly.",
                  "By converting neural network code into HTML web pages.",
                  "By requiring GPU liquid cooling systems."
                ],
                correctIndex: 0,
                explanation: "Quantization reduces memory footprint and accelerates throughput by representing float weights with lower-bit integer values."
              },
              {
                id: "q3_4",
                question: "What is the function of an enterprise AI Guardrail layer?",
                options: [
                  "Intercepting prompts and completions to filter toxic content, PII leakage, hallucination scores, and jailbreaks.",
                  "Preventing users from opening multiple browser tabs.",
                  "Limiting keyboard typing speed to 40 words per minute.",
                  "Blocking all outbound network traffic permanently."
                ],
                correctIndex: 0,
                explanation: "Guardrail platforms (like IBM watsonx.governance) act as real-time firewalls inspecting inputs and completions against corporate safety policies."
              },
              {
                id: "q3_5",
                question: "When evaluating Open-Weights vs Commercial API LLMs for enterprise, what key advantage do Open-Weights offer?",
                options: [
                  "Self-hosting within private enterprise VPC boundaries ensuring strict data sovereignty.",
                  "Zero electricity consumption during model training.",
                  "Guaranteed zero hallucinations under all prompt conditions.",
                  "Automatic free hardware GPU upgrades."
                ],
                correctIndex: 0,
                explanation: "Self-hosting open models keeps data inside company infrastructure without sending sensitive data to third-party cloud endpoints."
              },
              {
                id: "q3_6",
                question: "What is Synthetic Data Generation in enterprise Machine Learning?",
                options: [
                  "Using generative AI models to create artificial, statistically realistic datasets for model training without exposing real user data.",
                  "Copying and pasting existing SQL database tables manually.",
                  "Generating fake synthetic plastic hardware components.",
                  "Encrypting text files with AES-128."
                ],
                correctIndex: 0,
                explanation: "Synthetic data generation solves data scarcity and privacy concerns by learning underlying data distributions and synthesizing new privacy-compliant samples."
              },
              {
                id: "q3_7",
                question: "What role do Vector Databases play in Enterprise Semantic Search?",
                options: [
                  "Storing and indexing high-dimensional document embeddings using vector similarity algorithms (e.g. HNSW, Cosine Distance).",
                  "Formatting text files into plain HTML tables.",
                  "Compiling C++ code for desktop applications.",
                  "Storing user passwords in clear text."
                ],
                correctIndex: 0,
                explanation: "Vector databases index dense vector representations of unstructured text, enabling sub-second nearest-neighbor semantic search."
              },
              {
                id: "q3_8",
                question: "In LLM serving performance, what is the distinction between Latency and Throughput?",
                options: [
                  "Latency measures time-to-first-token per request; Throughput measures total generated tokens per second across concurrent users.",
                  "Latency measures GPU weight size; Throughput measures monitor screen resolution.",
                  "Latency is measured in megabytes; Throughput is measured in gigahertz.",
                  "Latency applies only to image models; Throughput applies only to audio models."
                ],
                correctIndex: 0,
                explanation: "Latency reflects individual user responsiveness, whereas throughput determines the total concurrent load capacity of the serving infrastructure."
              },
              {
                id: "q3_9",
                question: "What is IBM Watsonx.ai's primary enterprise value proposition?",
                options: [
                  "Providing an enterprise studio to train, validate, tune, and deploy curated foundation models with built-in governance.",
                  "Creating basic video editing tools for social media.",
                  "Replacing all human software engineers with static HTML templates.",
                  "Manufacturing physical computer hardware chips."
                ],
                correctIndex: 0,
                explanation: "Watsonx.ai integrates foundation models, data management tools, and compliance frameworks for trustworthy enterprise AI deployment."
              },
              {
                id: "q3_10",
                question: "What is the purpose of AI Model Lineage Documentation (Model Cards)?",
                options: [
                  "Documenting model architecture, training dataset sources, evaluation benchmarks, known limitations, and safety boundaries.",
                  "Tracking the physical shipping address of server racks.",
                  "Generating marketing slogans for mobile phone apps.",
                  "Formatting Python code indentation."
                ],
                correctIndex: 0,
                explanation: "Model Cards provide transparent auditing records specifying training data composition, evaluation scores, intended use cases, and ethical risk factors."
              }
            ]
          }
        ]
      },
      {
        id: "ch4",
        number: 4,
        title: "4. Google Introduction to Responsible AI",
        description: "Learn the basic ethical and safety responsibilities of using AI.",
        color: "emerald",
        accentGradient: "from-emerald-500 to-teal-600",
        nodes: [
          {
            id: "c4_google_responsible_ai",
            title: "Google Introduction to Responsible AI",
            subtitle: "Google Cloud Skills Boost",
            provider: "Google",
            externalUrl: "https://www.cloudskillsboost.google/course_templates/554",
            type: "concept",
            xpReward: 30,
            durationMinutes: 45,
            iconName: "GraduationCap",
            conceptSummary: "Learn Google's AI Principles, ethical safety guidelines, bias detection, fairness in data, and how to build accountable AI systems.",
            keyTopics: ["AI Ethics Principles", "Fairness & Bias Mitigation", "Safety & Interpretability"],
            fallbackQuestions: [
              {
                id: "q4_1",
                question: "Which of the following describes algorithmic bias in Machine Learning?",
                options: [
                  "When a model produces systematically prejudiced results due to historical skew or unrepresentative training data.",
                  "When an algorithm runs too fast on modern hardware.",
                  "When code uses double quotation marks instead of single quotes.",
                  "When a server experiences a temporary network loss."
                ],
                correctIndex: 0,
                explanation: "Models mirror the biases present in their training data or objective functions, necessitating proactive fairness audits."
              },
              {
                id: "q4_2",
                question: "What is Google's primary Principle regarding AI for harmful surveillance or weaponry?",
                options: [
                  "AI should not be designed or deployed for applications that cause overall harm, surveillance violating international norms, or weapons.",
                  "AI can be deployed for weapons if profits exceed $1 billion.",
                  "AI safety principles only apply to consumer mobile apps.",
                  "AI models must be forced to use public domain images."
                ],
                correctIndex: 0,
                explanation: "Google's AI Principles explicitly prohibit technologies whose purpose causes harm or facilitates mass illegal surveillance."
              },
              {
                id: "q4_3",
                question: "What is 'Explainable AI' (XAI) and why is interpretability critical?",
                options: [
                  "Methods allowing human auditors to comprehend how and why a model reached a specific prediction or decision.",
                  "Translating English documentation into foreign languages.",
                  "Printing out raw neural network binary weights on paper.",
                  "Encrypting model files with zero-knowledge proofs."
                ],
                correctIndex: 0,
                explanation: "XAI tools (e.g. SHAP, LIME, Integrated Gradients) make black-box model decisions transparent for safety, debugging, and regulatory compliance."
              },
              {
                id: "q4_4",
                question: "In Responsible AI, what is 'Differential Privacy'?",
                options: [
                  "A mathematical framework that guarantees individual records cannot be identified from aggregate statistical queries.",
                  "Hiding source code files in a hidden directory.",
                  "Encrypting text with standard baseline passwords.",
                  "Deleting database records after 30 days."
                ],
                correctIndex: 0,
                explanation: "Differential privacy injects bounded calibrated noise during model training or query evaluation to protect individual training samples."
              },
              {
                id: "q4_5",
                question: "What is a 'Red Teaming' exercise in generative model safety evaluation?",
                options: [
                  "Adversarial security testing where specialists actively attempt to bypass model guardrails and prompt safety filters.",
                  "Painting office computer cases red for high visibility.",
                  "A team building sports match held once per year.",
                  "Running code on Linux servers instead of Windows servers."
                ],
                correctIndex: 0,
                explanation: "Red Teaming simulates malicious prompt injection, jailbreaking, and exploits to uncover safety vulnerabilities prior to public model deployment."
              },
              {
                id: "q4_6",
                question: "How does Data Watermarking enhance Responsible AI transparency?",
                options: [
                  "By embedding imperceptible cryptographic tokens or noise patterns into generated synthetic text, image, or audio outputs.",
                  "By placing a visible text logo across the center of raw source code.",
                  "By washing physical server hard drives with water.",
                  "By compressing zip archives with passwords."
                ],
                correctIndex: 0,
                explanation: "Digital watermarking (like Google SynthID) allows downstream verification systems to trace whether content was synthesized by an AI model."
              },
              {
                id: "q4_7",
                question: "What is 'Fairness in Machine Learning' when evaluating demographic groups?",
                options: [
                  "Ensuring model performance (accuracy, false positive rate) is balanced and non-discriminatory across protected demographic groups.",
                  "Forcing all model outputs to be exactly 10 words long.",
                  "Giving every student a free laptop during exams.",
                  "Splitting cloud server costs equally among departments."
                ],
                correctIndex: 0,
                explanation: "Fairness metrics (e.g. Demographic Parity, Equalized Odds) audit models to prevent disproportionate error rates against marginalized demographics."
              },
              {
                id: "q4_8",
                question: "What is 'Data Provenance' in the context of Responsible AI training pipelines?",
                options: [
                  "Documenting the origin, copyright licensing, consent, and lineage of all training dataset records.",
                  "Checking the internet connection speed of the data center.",
                  "Counting the number of lines of code in a Python script.",
                  "Checking the serial numbers of server power cables."
                ],
                correctIndex: 0,
                explanation: "Data provenance verifies data legality, preventing unauthorized copyrighted content or non-consensual PII from contaminating training pipelines."
              },
              {
                id: "q4_9",
                question: "What is the primary objective of AI Harm Mitigation Frameworks?",
                options: [
                  "Proactively identifying, measuring, and minimizing societal, legal, privacy, and physical harms across the full AI product lifecycle.",
                  "Reducing the purchase price of cloud subscription plans.",
                  "Increasing the font size of error messages.",
                  "Forcing users to pass a typing speed test."
                ],
                correctIndex: 0,
                explanation: "Harm mitigation frameworks combine risk matrix assessments, automated evaluation benchmarks, and continuous post-deployment monitoring."
              },
              {
                id: "q4_10",
                question: "Why must human oversight ('Human-in-the-Loop') be maintained in high-stakes AI decisions (e.g., healthcare, lending)?",
                options: [
                  "To retain human accountability, moral judgment, and contextual domain expertise where autonomous failure carries severe consequences.",
                  "Because computers cannot calculate decimal numbers.",
                  "To fulfill mandatory manual typing requirements.",
                  "Because AI models run out of memory after 5 minutes."
                ],
                correctIndex: 0,
                explanation: "Human-in-the-loop oversight ensures ultimate legal and ethical accountability while preventing catastrophic automated decision failures."
              }
            ]
          }
        ]
      },
      {
        id: "ch5",
        number: 5,
        title: "5. Anthropic AI Fluency",
        description: "Learn how to collaborate with AI through Delegation, Description, Discernment, and Diligence.",
        color: "emerald",
        accentGradient: "from-emerald-500 to-teal-600",
        nodes: [
          {
            id: "c5_anthropic_fluency",
            title: "Anthropic AI Fluency",
            subtitle: "Anthropic Skilljar Foundations",
            provider: "Anthropic",
            externalUrl: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
            type: "boss",
            xpReward: 40,
            durationMinutes: 60,
            iconName: "Crown",
            conceptSummary: "Master Anthropic's 4D Framework for Human-AI Collaboration: Delegation, Description, Discernment, and Diligence to partner effectively with AI models.",
            keyTopics: ["4D Framework (Delegation, Description, Discernment, Diligence)", "Prompt Clarity", "Verification Workflows"],
            fallbackQuestions: [
              {
                id: "q5_1",
                question: "What does 'Discernment' mean in the Anthropic AI Fluency 4D Framework?",
                options: [
                  "Critically evaluating AI-generated outputs for accuracy, hallucination, logic gaps, and tone.",
                  "Delegating 100% of executive decisions without human review.",
                  "Writing prompts using only capital letters.",
                  "Setting the GPU clock speed to maximum frequency."
                ],
                correctIndex: 0,
                explanation: "Discernment is the human skill of auditing model outputs, identifying subtle errors, and judging whether the response meets quality standards."
              },
              {
                id: "q5_2",
                question: "In Anthropic's 4D Framework, what is the role of 'Delegation'?",
                options: [
                  "Identifying which tasks are suitable for AI acceleration versus tasks requiring human domain judgment.",
                  "Forcing the AI model to write its own source code without prompts.",
                  "Transferring company budget ownership to automated servers.",
                  "Delegating password reset duties to external contractors."
                ],
                correctIndex: 0,
                explanation: "Delegation involves strategically deciding what sub-tasks to assign to AI based on model capabilities and risk profiles."
              },
              {
                id: "q5_3",
                question: "What principle defines 'Description' in the Anthropic AI Fluency framework?",
                options: [
                  "Communicating task intent, constraints, context, persona, and output formats clearly to the model.",
                  "Writing long descriptive novels using pen and paper.",
                  "Describing physical computer hardware components.",
                  "Translating XML files into YAML files."
                ],
                correctIndex: 0,
                explanation: "Description focuses on precision in prompt design, providing explicit guidelines, context, and structural bounds."
              },
              {
                id: "q5_4",
                question: "What does 'Diligence' represent in human-AI collaboration?",
                options: [
                  "Maintaining continuous ethical responsibility, validation checks, and safety oversight throughout AI adoption.",
                  "Working 24 hours without taking any breaks.",
                  "Re-running the same prompt 100 times without changing parameters.",
                  "Installing software updates every hour."
                ],
                correctIndex: 0,
                explanation: "Diligence is the ongoing commitment to safety, auditing, data compliance, and human oversight in AI workflows."
              },
              {
                id: "q5_5",
                question: "Why does Anthropic recommend using explicit XML tags (e.g. <context>, <instructions>) in prompts?",
                options: [
                  "They create clear structural boundaries separating context from instructions, reducing prompt injection and ambiguity.",
                  "They accelerate GPU clock cycles by 50%.",
                  "They compress prompt file size on disk.",
                  "They convert plain text into web browser HTML."
                ],
                correctIndex: 0,
                explanation: "XML tags help Claude models isolate different components of a prompt, preventing instructions from bleeding into context data."
              },
              {
                id: "q5_6",
                question: "What is 'Chain-of-Thought' (CoT) prompting in Anthropic's prompt design guidelines?",
                options: [
                  "Instructing the model to think step-by-step inside <thinking> tags before generating its final output.",
                  "Linking 10 different API servers in a sequential chain.",
                  "Writing a continuous sentence without any punctuation.",
                  "Executing multiple Docker containers simultaneously."
                ],
                correctIndex: 0,
                explanation: "CoT prompting encourages the model to break complex reasoning into intermediate steps, improving accuracy on logic and math tasks."
              },
              {
                id: "q5_7",
                question: "How does giving the model an 'out' (e.g., 'If you don't know the answer, say so') affect hallucinations?",
                options: [
                  "It significantly reduces hallucinations by permitting the model to abstain rather than fabricate plausible answers.",
                  "It causes the model to crash with an unhandled exception.",
                  "It forces the model to search the local hard drive.",
                  "It deletes the prompt context history."
                ],
                correctIndex: 0,
                explanation: "Explicit permission to express uncertainty prevents the model from feeling forced to output speculative or false tokens."
              },
              {
                id: "q5_8",
                question: "In Anthropic AI Fluency, what is 'Prefill Output' (System/Assistant Role prefill)?",
                options: [
                  "Starting the assistant's response with desired syntax (e.g. '{' for JSON) to enforce exact output formatting.",
                  "Filling out paper feedback forms before prompt submission.",
                  "Pre-loading GPU memory with random floating point numbers.",
                  "Pre-installing browser extensions before running the app."
                ],
                correctIndex: 0,
                explanation: "Prefilling the initial characters of the Assistant response guides the model directly into structured output formats like JSON or XML."
              },
              {
                id: "q5_9",
                question: "What is the key benefit of Few-Shot Examples in prompt engineering?",
                options: [
                  "Demonstrating expected input-output patterns directly in context to align style, schema, and edge-case handling.",
                  "Training the neural network base weights on 10 million images.",
                  "Reducing the context window length to 10 tokens.",
                  "Deleting previous chat session logs."
                ],
                correctIndex: 0,
                explanation: "Providing high-quality in-context examples anchors the model's pattern matching without requiring parameter fine-tuning."
              },
              {
                id: "q5_10",
                question: "When evaluating an AI's response for critical work, why is 'Verifiable Grounding' necessary?",
                options: [
                  "Because every claim generated by an LLM must be cross-checked against primary reference documents or trustworthy data sources.",
                  "Because models run faster when grounded to electric cables.",
                  "Because all LLM outputs are guaranteed to be false.",
                  "Because ground wires protect servers from power surges."
                ],
                correctIndex: 0,
                explanation: "Grounding verifies generated statements against gold-standard citations, fulfilling the Discernment and Diligence pillars of AI fluency."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "LEVEL 2 — Moderate Understanding",
    subtitle: "Core ML mechanics, Generative AI for Everyone, Udacity AI Fundamentals & Prompting for Everyone",
    badge: "⚡ Level 2",
    description: "Connect foundational concepts to machine learning algorithms, search, probability, neural networks, computer vision, NLP, and practical prompting workflows.",
    themeColor: "blue",
    chapters: [
      {
        id: "ch6",
        number: 6,
        title: "6. Elements of AI",
        description: "Learn search, probability, machine learning, regression, neural networks, and AI implications.",
        color: "blue",
        accentGradient: "from-blue-500 to-indigo-600",
        nodes: [
          {
            id: "c6_elements_ai",
            title: "Elements of AI",
            subtitle: "University of Helsinki & Reaktor",
            provider: "Elements of AI",
            externalUrl: "https://www.elementsofai.com/",
            type: "concept",
            xpReward: 45,
            durationMinutes: 90,
            iconName: "Brain",
            conceptSummary: "Master fundamental computer science & mathematical concepts behind AI: problem solving with state-space search, Bayes theorem, regression, and artificial neural networks.",
            keyTopics: ["State-Space Search & A*", "Bayesian Probability", "Neural Networks & Perceptrons"],
            fallbackQuestions: [
              {
                id: "q6_1",
                question: "How does Bayesian Probability assist in AI applications like spam filtering?",
                options: [
                  "It updates the likelihood of an event (e.g. email is spam) based on prior evidence and word frequencies.",
                  "It deletes all incoming emails automatically without reading them.",
                  "It guarantees 100% accuracy on unseen data with zero mathematical error.",
                  "It compiles C++ code into machine assembly."
                ],
                correctIndex: 0,
                explanation: "Bayes' Theorem provides a statistical method to update probability estimates as new evidence (words like 'WINNER' or 'FREE') is observed."
              },
              {
                id: "q6_2",
                question: "What is the primary objective of Nearest Neighbor classification (k-NN)?",
                options: [
                  "Assigning a class label to an unlabelled data point based on the majority vote of its 'k' closest points in feature space.",
                  "Finding the fastest physical train route between two cities.",
                  "Compressing video files into MP4 format.",
                  "Evaluating boolean truth tables."
                ],
                correctIndex: 0,
                explanation: "k-NN is a non-parametric distance-based classifier that categorizes items by measuring Euclidean or Manhattan metric distances to neighboring samples."
              },
              {
                id: "q6_3",
                question: "What is the function of an Activation Function (e.g. ReLU, Sigmoid) in an Artificial Neural Network?",
                options: [
                  "Introducing non-linearity, enabling the network to learn complex non-linear decision boundaries.",
                  "Limiting CPU temperature to under 70 degrees.",
                  "Formatting output text in bold font.",
                  "Counting total rows in a relational database."
                ],
                correctIndex: 0,
                explanation: "Without non-linear activation functions, a neural network, regardless of depth, collapses mathematically into a single linear regression model."
              },
              {
                id: "q6_4",
                question: "In Machine Learning, what is 'Overfitting'?",
                options: [
                  "When a model memorizes noise and exact training samples, performing exceptionally on training data but failing on unseen test data.",
                  "When a dataset file size exceeds 1 Gigabyte.",
                  "When a computer monitor runs at 144Hz refresh rate.",
                  "When a model trains in less than 5 seconds."
                ],
                correctIndex: 0,
                explanation: "Overfitting occurs when high model capacity fits dataset quirks rather than generalizable underlying patterns."
              },
              {
                id: "q6_5",
                question: "What is Linear Regression used for in statistical machine learning?",
                options: [
                  "Predicting a continuous numerical output value based on linear combinations of input features.",
                  "Classifying images into cat or dog categories.",
                  "Translating spoken audio into French text.",
                  "Generating synthetic photo-realistic human faces."
                ],
                correctIndex: 0,
                explanation: "Linear Regression fits a straight line or hyperplane (y = wx + b) to minimize sum-of-squared errors against target numeric labels."
              },
              {
                id: "q6_6",
                question: "What is the role of 'State-Space Search' algorithms like A* in AI problem solving?",
                options: [
                  "Finding an optimal path from a start state to a goal state using heuristic evaluation functions.",
                  "Searching through a text document for spelling errors.",
                  "Formatting hard drive partitions into NTFS format.",
                  "Compiling Python code into bytecode."
                ],
                correctIndex: 0,
                explanation: "A* search evaluates path cost g(n) + heuristic h(n) to traverse graph node states efficiently in route finding and game AI."
              },
              {
                id: "q6_7",
                question: "What is a 'Perceptron' in the history of artificial neural networks?",
                options: [
                  "The simplest binary threshold classifier unit that computes a weighted sum of inputs and applies a step function.",
                  "A supercomputer built in the year 2020.",
                  "A quantum memory cell used in satellite communication.",
                  "An optical camera lens used for facial recognition."
                ],
                correctIndex: 0,
                explanation: "Frank Rosenblatt's Perceptron (1957) is the foundational building block of modern multi-layer feedforward neural networks."
              },
              {
                id: "q6_8",
                question: "In unsupervised machine learning, what is the goal of K-Means Clustering?",
                options: [
                  "Partitioning unlabelled data points into K distinct clusters where each point belongs to the cluster with the nearest mean centroid.",
                  "Training a model with labeled true/false targets.",
                  "Translating text using dictionary lookups.",
                  "Sorting numbers in ascending order."
                ],
                correctIndex: 0,
                explanation: "K-Means iteratively updates centroid positions to minimize intra-cluster variance without requiring ground-truth supervision."
              },
              {
                id: "q6_9",
                question: "What is the 'Turing Test' proposed by Alan Turing in 1950?",
                options: [
                  "An operational test evaluating whether an evaluator can reliably distinguish human text responses from machine responses in natural dialogue.",
                  "A speed benchmark testing how many operations a computer processor performs per second.",
                  "A security test to check if a website is infected with viruses.",
                  "A test measuring monitor color accuracy."
                ],
                correctIndex: 0,
                explanation: "The Turing Test evaluates conversational intelligence by determining if a machine can imitate human natural language dialogue convincingly."
              },
              {
                id: "q6_10",
                question: "In Machine Learning, what is a 'Confusion Matrix'?",
                options: [
                  "A 2x2 or NxN table displaying True Positives, False Positives, True Negatives, and False Negatives to evaluate classifier performance.",
                  "A complex mathematical formula that causes computers to freeze.",
                  "A random matrix used to scramble passwords.",
                  "A chart showing GPU memory usage over time."
                ],
                correctIndex: 0,
                explanation: "A Confusion Matrix details detailed error metrics (Precision, Recall, F1-Score) beyond raw accuracy."
              }
            ]
          },
          {
            id: "c6_chest",
            title: "Level 2 Power Chest",
            subtitle: "Bonus XP & Gems",
            provider: "Bonus",
            type: "chest",
            xpReward: 30,
            durationMinutes: 1,
            iconName: "Gift",
            conceptSummary: "Claim bonus gems and XP as you conquer Moderate AI topics!",
            keyTopics: ["Level 2 Boost", "Gems Reward"]
          }
        ]
      },
      {
        id: "ch7",
        number: 7,
        title: "7. Generative AI for Everyone",
        description: "Connect general AI concepts to modern generative AI, LLMs, RAG, fine-tuning, and applications.",
        color: "blue",
        accentGradient: "from-blue-500 to-indigo-600",
        nodes: [
          {
            id: "c7_deeplearning_genai_everyone",
            title: "Generative AI for Everyone",
            subtitle: "DeepLearning.AI (Andrew Ng)",
            provider: "DeepLearning.AI",
            externalUrl: "https://www.deeplearning.ai/courses/generative-ai-for-everyone/",
            type: "concept",
            xpReward: 45,
            durationMinutes: 60,
            iconName: "Zap",
            conceptSummary: "Led by Andrew Ng, learn how generative AI works, its real-world capabilities & limitations, Retrieval-Augmented Generation (RAG), fine-tuning, and societal impact.",
            keyTopics: ["What Gen AI Can & Cannot Do", "RAG (Retrieval-Augmented Generation)", "Fine-Tuning vs Prompting"],
            fallbackQuestions: [
              {
                id: "q7_1",
                question: "What problem does Retrieval-Augmented Generation (RAG) primarily solve for LLMs?",
                options: [
                  "It supplies relevant up-to-date domain knowledge from external databases into the prompt context to reduce hallucinations.",
                  "It makes the LLM run without using any computer memory.",
                  "It converts audio files into 3D polygon meshes.",
                  "It changes the font style of generated text."
                ],
                correctIndex: 0,
                explanation: "RAG fetches relevant document chunks at runtime and injects them into the model's context, providing accurate, verifiable grounding."
              },
              {
                id: "q7_2",
                question: "According to Andrew Ng's 'Generative AI for Everyone', what is a major limitation of current LLMs?",
                options: [
                  "They struggle with precise logical reasoning, real-time factual currency without external search, and catastrophic hallucinations.",
                  "They can only process text in English.",
                  "They require human operators to manually type every response character.",
                  "They cannot run on modern cloud server infrastructure."
                ],
                correctIndex: 0,
                explanation: "LLMs operate probabilistically rather than deterministically, making them susceptible to reasoning slips and false assertions without RAG."
              },
              {
                id: "q7_3",
                question: "When should an enterprise prefer Fine-Tuning over Prompting and RAG?",
                options: [
                  "When teaching a model a unique specialized style, jargon, or output structure that prompt instructions alone cannot reliably enforce.",
                  "When needing real-time news updates published 5 minutes ago.",
                  "When reducing software license fees to zero.",
                  "When converting PDF files into CSV files."
                ],
                correctIndex: 0,
                explanation: "Fine-tuning bakes stylistic preferences and domain syntax directly into model weights, whereas RAG supplies changing factual data."
              },
              {
                id: "q7_4",
                question: "In Generative AI product development, what is a 'Lifecycle Workflow'?",
                options: [
                  "Scoping the use case, selecting a base model, prompt engineering / RAG, evaluating safety, fine-tuning if needed, and monitoring in production.",
                  "Buying new hardware monitors every 6 months.",
                  "Deleting all user accounts after 1 year.",
                  "Writing code without testing performance."
                ],
                correctIndex: 0,
                explanation: "An end-to-end GenAI lifecycle spans problem scoping, prompt prototyping, model alignment, quantitative evaluation, and production monitoring."
              },
              {
                id: "q7_5",
                question: "How do LLM Agents differ from simple single-turn Prompt-Response interactions?",
                options: [
                  "Agents plan multi-step execution paths, call external APIs/tools dynamically, evaluate results, and iterate autonomously to reach goals.",
                  "Agents operate without electricity.",
                  "Agents only print out static hello world text.",
                  "Agents delete prompt history after every word."
                ],
                correctIndex: 0,
                explanation: "AI Agents combine reasoning, memory, tool access (search, code execution, SQL), and feedback loops to perform multi-step workflows."
              },
              {
                id: "q7_6",
                question: "What is 'Hallucination Risk' in commercial Generative AI deployments?",
                options: [
                  "The risk that a model generates false, misleading, or fabricated statements presented with high confidence.",
                  "The risk that a computer screen flashes bright colors.",
                  "The risk that an internet router disconnects.",
                  "The risk that code compiles too quickly."
                ],
                correctIndex: 0,
                explanation: "Hallucinations pose legal, reputational, and operational risks, necessitating RAG, guardrails, and human-in-the-loop validation."
              },
              {
                id: "q7_7",
                question: "In RAG pipelines, what is 'Chunking'?",
                options: [
                  "Splitting large source documents into smaller semantic text blocks (e.g. 512 tokens) prior to vector embedding and retrieval.",
                  "Deleting 50% of a database table to save disk space.",
                  "Merging 10 video files into a single zip file.",
                  "Formatting text using random spaces."
                ],
                correctIndex: 0,
                explanation: "Optimal chunk size ensures vector search retrieves precise context without overflowing context limits or diluting relevance."
              },
              {
                id: "q7_8",
                question: "What is 'Semantic Search' compared to traditional Keyword Search?",
                options: [
                  "Semantic Search matches conceptual meaning using vector embeddings, whereas Keyword Search relies on exact word string matches.",
                  "Keyword Search understands synonyms automatically while Semantic Search fails on exact matches.",
                  "Semantic Search requires paper books.",
                  "Keyword Search runs only on mobile phones."
                ],
                correctIndex: 0,
                explanation: "Vector embeddings represent conceptual meaning, allowing 'physician' and 'doctor' to match semantically without sharing identical keywords."
              },
              {
                id: "q7_9",
                question: "What is 'Prompt Injection' vulnerability in Gen AI applications?",
                options: [
                  "Untrusted user input hijacking model instructions to bypass security controls or execute unauthorized commands.",
                  "Injecting liquid coolant into server racks.",
                  "Increasing prompt text size using CSS styles.",
                  "Downloading model weight files over Wi-Fi."
                ],
                correctIndex: 0,
                explanation: "Direct or indirect prompt injections trick the LLM into treating user data as system instructions, breaking app guardrails."
              },
              {
                id: "q7_10",
                question: "What is the economic impact of Generative AI automation according to AI industry leaders?",
                options: [
                  "Augmenting knowledge worker productivity by automating repetitive tasks, elevating human focus toward higher-level analysis.",
                  "Eliminating the need for software code entirely.",
                  "Increasing manual paper filing requirements.",
                  "Halting internet traffic growth globally."
                ],
                correctIndex: 0,
                explanation: "Gen AI acts primarily as a cognitive amplifier, accelerating drafting, coding, research, and analysis across professional industries."
              }
            ]
          }
        ]
      },
      {
        id: "ch8",
        number: 8,
        title: "8. Udacity AI Fundamentals through Ethiopian Coders",
        description: "Learn how AI is applied through machine learning, computer vision, NLP, and conversational AI.",
        color: "blue",
        accentGradient: "from-blue-500 to-indigo-600",
        nodes: [
          {
            id: "c8_udacity_ai_fundamentals",
            title: "Udacity AI Fundamentals",
            subtitle: "Udacity & Ethiopian Coders",
            provider: "Udacity",
            externalUrl: "https://www.udacity.com/course/ai-fundamentals--ud099",
            type: "concept",
            xpReward: 45,
            durationMinutes: 90,
            iconName: "Activity",
            conceptSummary: "Hands-on exploration of key AI domains: computer vision for image detection, natural language processing (NLP), speech recognition, and conversational agents.",
            keyTopics: ["Computer Vision (CNNs)", "NLP & Text Processing", "Conversational AI Systems"],
            fallbackQuestions: [
              {
                id: "q8_1",
                question: "Which neural network architecture is traditionally best suited for Computer Vision image tasks?",
                options: [
                  "Convolutional Neural Networks (CNNs)",
                  "Simple 1D Linear Polynomials",
                  "Decision Trees",
                  "K-Means Clustering"
                ],
                correctIndex: 0,
                explanation: "CNNs use spatial convolution kernels to scan pixel grids and automatically learn visual feature hierarchies (edges, textures, objects)."
              },
              {
                id: "q8_2",
                question: "In Natural Language Processing (NLP), what is 'Tokenization'?",
                options: [
                  "Segmenting raw text strings into discrete units (words, sub-words, or characters) represented by integer vocabulary IDs.",
                  "Converting text files into MP3 audio streams.",
                  "Encrypting text with RSA public keys.",
                  "Deleting uppercase letters from a document."
                ],
                correctIndex: 0,
                explanation: "Tokenization maps string characters into numerical vocabulary tokens consumed by neural network embedding layers."
              },
              {
                id: "q8_3",
                question: "What is the primary role of Automatic Speech Recognition (ASR) systems?",
                options: [
                  "Converting spoken audio waveforms into written natural language text transcriptions.",
                  "Translating static web code into C++.",
                  "Generating 3D character animations.",
                  "Formatting Excel spreadsheets."
                ],
                correctIndex: 0,
                explanation: "ASR models (e.g. OpenAI Whisper) process acoustic spectrograms to generate accurate text transcriptions across accents."
              },
              {
                id: "q8_4",
                question: "What is 'Sentiment Analysis' in text classification applications?",
                options: [
                  "Categorizing text to determine subjective emotional polarity (positive, negative, neutral).",
                  "Counting total word frequency in a book.",
                  "Translating English into Spanish.",
                  "Detecting grammatical spelling errors."
                ],
                correctIndex: 0,
                explanation: "Sentiment analysis leverages NLP classifiers to evaluate customer reviews, feedback, or social sentiment."
              },
              {
                id: "q8_5",
                question: "In Computer Vision, how does Object Detection differ from Image Classification?",
                options: [
                  "Classification identifies overall image categories; Object Detection predicts category labels AND draws bounding box locations for multiple objects.",
                  "Classification works only on black-and-white photos.",
                  "Object Detection runs without requiring any pixels.",
                  "Classification compresses video files."
                ],
                correctIndex: 0,
                explanation: "Object Detection algorithms (e.g. YOLO, Faster R-CNN) localize multiple instances with coordinate bounding boxes."
              },
              {
                id: "q8_6",
                question: "What is an Intent Classifier in Conversational AI dialogue systems?",
                options: [
                  "A module that determines what goal or action the user wants to accomplish (e.g. 'book_flight', 'check_balance').",
                  "A program that measures internet connection ping.",
                  "A database query that deletes user profiles.",
                  "A sensor measuring laptop battery life."
                ],
                correctIndex: 0,
                explanation: "Intent classification categorizes user utterances to route conversational flows to appropriate API fulfillment handlers."
              },
              {
                id: "q8_7",
                question: "What is 'Named Entity Recognition' (NER) in NLP pipelines?",
                options: [
                  "Identifying and extracting structured entity categories (persons, organizations, locations, dates) from unstructured text.",
                  "Renaming file extensions on disk.",
                  "Translating XML code into JSON.",
                  "Sorting array elements alphabetically."
                ],
                correctIndex: 0,
                explanation: "NER models extract domain entities like 'Google' (Organization) or 'Tokyo' (Location) from raw sentences."
              },
              {
                id: "q8_8",
                question: "In Machine Learning model evaluation, what does the 'F1-Score' measure?",
                options: [
                  "The harmonic mean of Precision and Recall, providing a balanced metric for imbalanced datasets.",
                  "The total execution time of model inference in milliseconds.",
                  "The exact percentage of training dataset rows.",
                  "The physical size of model checkpoint files on disk."
                ],
                correctIndex: 0,
                explanation: "F1-Score = 2 * (Precision * Recall) / (Precision + Recall), giving equal weight to precision and recall."
              },
              {
                id: "q8_9",
                question: "What is 'Transfer Learning' in Deep Learning applications?",
                options: [
                  "Taking a pre-trained model trained on a large dataset and fine-tuning it on a smaller target domain dataset.",
                  "Transferring files over FTP to a remote server.",
                  "Copying source code from one computer to another.",
                  "Downloading smartphone app updates."
                ],
                correctIndex: 0,
                explanation: "Transfer learning reuses feature representations learned from broad data (e.g. ImageNet or C4) to solve specialized tasks faster."
              },
              {
                id: "q8_10",
                question: "What is the primary function of Text-to-Speech (TTS) synthesis engines?",
                options: [
                  "Converting written text input into natural-sounding spoken audio speech waveforms.",
                  "Converting text into PDF documents.",
                  "Deleting punctuation marks from sentences.",
                  "Recording microphone audio to disk."
                ],
                correctIndex: 0,
                explanation: "TTS systems (e.g. Tacotron, Bark, WaveNet) map phonemes into neural speech synthesis waveforms."
              }
            ]
          }
        ]
      },
      {
        id: "ch9",
        number: 9,
        title: "9. AI Prompting for Everyone",
        description: "Learn research, deep search, brainstorming, critique, writing, multimedia, and AI-assisted workflows.",
        color: "blue",
        accentGradient: "from-blue-500 to-indigo-600",
        nodes: [
          {
            id: "c9_deeplearning_prompting",
            title: "AI Prompting for Everyone",
            subtitle: "DeepLearning.AI",
            provider: "DeepLearning.AI",
            externalUrl: "https://www.deeplearning.ai/courses/ai-prompting-for-everyone",
            type: "boss",
            xpReward: 50,
            durationMinutes: 60,
            iconName: "Crown",
            conceptSummary: "Master effective daily prompting techniques: deep web research, structured brainstorming, automated critique, professional writing, and multimedia creative workflows.",
            keyTopics: ["Interactive Brainstorming", "Critique & Refinement Loops", "AI-Assisted Writing & Analysis"],
            fallbackQuestions: [
              {
                id: "q9_1",
                question: "How can you use the 'Critique & Refine' prompting pattern to improve AI output quality?",
                options: [
                  "Ask the AI to first draft a response, then explicitly ask it to critique its own draft for flaws, and produce a revised version.",
                  "Close the web browser tab and start over manually.",
                  "Type 'Make it good' repeatedly 10 times.",
                  "Delete the original prompt and submit blank text."
                ],
                correctIndex: 0,
                explanation: "Two-step self-critique prompting forces the model to evaluate its initial response against quality criteria before synthesizing a polished final answer."
              },
              {
                id: "q9_2",
                question: "What is 'Role/Persona Prompting' in creative AI workflows?",
                options: [
                  "Assigning a specific domain identity (e.g. 'Act as a Senior Cyber-Security Auditor') to guide perspective, depth, and vocabulary.",
                  "Setting the operating system username to Administrator.",
                  "Changing the color scheme of the web application.",
                  "Downloading a third-party browser plugin."
                ],
                correctIndex: 0,
                explanation: "Persona prompting steers latent model activation towards specialized vocabulary, tone, and domain expertise."
              },
              {
                id: "q9_3",
                question: "In Deep Research prompting, why is asking the LLM to 'List Assumptions and Unknowns' valuable?",
                options: [
                  "It forces the model to expose hidden premises, identifying gaps where external factual verification is required.",
                  "It causes the model to delete all formatting tags.",
                  "It decreases generation speed by 10x.",
                  "It disables JSON formatting."
                ],
                correctIndex: 0,
                explanation: "Explicitly asking for assumptions prevents unstated bias from distorting analytical research outputs."
              },
              {
                id: "q9_4",
                question: "What is 'Tabular Data Structuring' in prompt engineering?",
                options: [
                  "Requesting outputs explicitly formatted in Markdown tables, CSV, or JSON schemas for easy programmatic parsing.",
                  "Printing out raw text without line breaks.",
                  "Drawing ASCII pictures of furniture tables.",
                  "Converting files into executable binary archives."
                ],
                correctIndex: 0,
                explanation: "Demanding structured tabular format prevents prose rambling and enforces uniform schema alignment."
              },
              {
                id: "q9_5",
                question: "How does 'Socratic Brainstorming' with an LLM assist project planning?",
                options: [
                  "The AI asks the human a series of probing questions one by one to discover hidden requirements before generating solutions.",
                  "The AI dictates answers without listening to user feedback.",
                  "The AI generates 100 random numbers.",
                  "The AI translates text into ancient Greek."
                ],
                correctIndex: 0,
                explanation: "Socratic prompting flips the conversation flow so the AI extracts domain nuances from the user prior to recommendation."
              },
              {
                id: "q9_6",
                question: "What is 'Constraint Bounding' in writing assistance prompts?",
                options: [
                  "Setting negative constraints (e.g., 'Do NOT use buzzwords like leverage or elevate') and length caps to keep style clean.",
                  "Setting the computer screen resolution to 1080p.",
                  "Restricting keyboard typing to lowercase letters only.",
                  "Locking the browser scrollbar."
                ],
                correctIndex: 0,
                explanation: "Constraint bounds eliminate cliché phrases and enforce rigid style or word count limits."
              },
              {
                id: "q9_7",
                question: "When using LLMs for Code Refactoring, why should you prompt for 'Modular Unit Tests' alongside code?",
                options: [
                  "Unit tests verify edge-case behavioral correctness, providing immediate automated test execution against generated refactors.",
                  "Unit tests make code run 50% faster on hardware.",
                  "Unit tests remove the need for compilers.",
                  "Unit tests automatically publish code to GitHub."
                ],
                correctIndex: 0,
                explanation: "Generating unit tests alongside refactored modules establishes an objective verification harness."
              },
              {
                id: "q9_8",
                question: "In multimedia prompting (image generation models), what are 'Negative Prompts'?",
                options: [
                  "Specifying visual elements to explicitly exclude from the rendered image (e.g. 'blur, extra limbs, distorted text').",
                  "Prompts written with rude language.",
                  "Prompts saved in a hidden folder.",
                  "Prompts that delete original source images."
                ],
                correctIndex: 0,
                explanation: "Negative prompts penalize unwanted visual artifacts in diffusion model latent space sampling."
              },
              {
                id: "q9_9",
                question: "What is the 'Step-by-Step Task Decomposition' prompt pattern?",
                options: [
                  "Breaking a complex workflow into sequential sub-prompts where each step uses output from the previous step.",
                  "Executing all code lines simultaneously in parallel without order.",
                  "Writing a prompt with no line breaks or paragraphs.",
                  "Deleting intermediate draft files."
                ],
                correctIndex: 0,
                explanation: "Decomposition reduces cognitive load per turn, preventing cumulative context dilution across multi-stage tasks."
              },
              {
                id: "q9_10",
                question: "Why should prompt engineers test prompts against multiple edge-case inputs before finalizing them?",
                options: [
                  "To verify prompt robustness across diverse input variations, preventing failure on unexpected user inputs.",
                  "To increase the cost of cloud server subscriptions.",
                  "To force the model to update its training weights.",
                  "To change the default font size."
                ],
                correctIndex: 0,
                explanation: "Robustness testing ensures prompts produce consistent schema-compliant outputs regardless of input variance."
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "LEVEL 3 — Advanced Practical Application",
    subtitle: "AWS Prompt Engineering, Google Prompting Essentials & Vanderbilt Advanced Prompt Patterns",
    badge: "🚀 Level 3",
    description: "Master zero-shot, few-shot, chain-of-thought, Google's structured prompting framework, and advanced reusable prompt patterns for ChatGPT and Claude.",
    themeColor: "purple",
    chapters: [
      {
        id: "ch10",
        number: 10,
        title: "10. AWS Essentials of Prompt Engineering",
        description: "Learn zero-shot, few-shot, chain-of-thought, refinement, and prompt risks.",
        color: "purple",
        accentGradient: "from-purple-500 to-pink-600",
        nodes: [
          {
            id: "c10_aws_prompt_engineering",
            title: "AWS Essentials of Prompt Engineering",
            subtitle: "AWS & Coursera",
            provider: "AWS",
            externalUrl: "https://www.coursera.org/learn/essentials-of-prompt-engineering",
            type: "concept",
            xpReward: 50,
            durationMinutes: 60,
            iconName: "TrendingUp",
            conceptSummary: "Learn core prompt engineering strategies on AWS Amazon Bedrock: zero-shot vs few-shot prompting, Chain-of-Thought (CoT) reasoning, negative constraints, and prompt injection risk mitigation.",
            keyTopics: ["Zero-Shot vs Few-Shot", "Chain-of-Thought (CoT)", "Prompt Injection Security"],
            fallbackQuestions: [
              {
                id: "q10_1",
                question: "What is 'Chain-of-Thought' (CoT) prompting and why is it effective for complex logic?",
                options: [
                  "Instructing the model to show step-by-step reasoning before outputting the final answer, significantly reducing reasoning errors.",
                  "Linking multiple physical computers together with HDMI cables.",
                  "Running 10 prompts simultaneously in parallel threads.",
                  "Encrypting prompt text with AES-256."
                ],
                correctIndex: 0,
                explanation: "CoT prompting gives the LLM 'thinking space' in its generation tokens to compute intermediate reasoning steps prior to giving a final answer."
              },
              {
                id: "q10_2",
                question: "How does Zero-Shot prompting differ from Few-Shot prompting in AWS Bedrock?",
                options: [
                  "Zero-Shot provides only instructions without examples; Few-Shot provides exemplar input-output pairs in the context to guide the model.",
                  "Zero-Shot costs zero dollars whereas Few-Shot costs thousands of dollars.",
                  "Few-Shot executes only on mobile phones.",
                  "Zero-Shot requires writing Python C-extensions."
                ],
                correctIndex: 0,
                explanation: "Few-Shot prompting conditions model generation on concrete exemplar demonstrations included directly in the input prompt."
              },
              {
                id: "q10_3",
                question: "What is 'System Prompting' in foundational model configuration?",
                options: [
                  "Top-level instructions defining high-level behavior, constraints, safety boundaries, and role identities across the conversation.",
                  "Reinstalling the Linux operating system kernel.",
                  "Formatting server hard drives.",
                  "Sending email newsletters to system administrators."
                ],
                correctIndex: 0,
                explanation: "System prompts define persistent operating parameters and guardrails that dictate how the model processes user turns."
              },
              {
                id: "q10_4",
                question: "What parameter controls output randomness/creativity in models hosted on AWS Amazon Bedrock?",
                options: [
                  "Temperature and Top-P (Nucleus Sampling).",
                  "CPU Fan Speed.",
                  "Screen Resolution.",
                  "Network Bandwidth Limit."
                ],
                correctIndex: 0,
                explanation: "Temperature flattens or sharpens the token probability distribution, while Top-P cuts off lower-probability cumulative candidate tokens."
              },
              {
                id: "q10_5",
                question: "What is 'Indirect Prompt Injection' in enterprise Gen AI architectures?",
                options: [
                  "When a model ingests untrusted third-party content (e.g. website or email body) that contains embedded adversarial instructions.",
                  "Plugging a USB flash drive into a server.",
                  "Sending an encrypted REST payload.",
                  "Updating database schema indexes."
                ],
                correctIndex: 0,
                explanation: "Indirect injection occurs when external retrieved data secretly contains malicious prompt directives that override original system instructions."
              },
              {
                id: "q10_6",
                question: "Why are 'Negative Constraints' (e.g., 'Do NOT include medical advice') critical in enterprise prompt design?",
                options: [
                  "They explicitly forbid unwanted behaviors or unsafe domain scope breaches.",
                  "They delete the output file if errors occur.",
                  "They invert color schemes in the UI.",
                  "They decrease network latency."
                ],
                correctIndex: 0,
                explanation: "Negative constraints establish clear boundary safety walls, reducing legal compliance risk in automated outputs."
              },
              {
                id: "q10_7",
                question: "What is 'Tree-of-Thoughts' (ToT) prompting as an evolution of Chain-of-Thought?",
                options: [
                  "Exploring multiple reasoning branches simultaneously, evaluating intermediate thought states, and backtracking to find optimal paths.",
                  "Planting trees in server data centers.",
                  "Designing binary search trees in C++.",
                  "Sorting strings in alphabetical order."
                ],
                correctIndex: 0,
                explanation: "ToT allows LLMs to evaluate alternative candidate reasoning paths and backtrack, ideal for strategic planning and puzzle solving."
              },
              {
                id: "q10_8",
                question: "In AWS Bedrock Guardrails, what is 'PII Masking'?",
                options: [
                  "Automatically detecting and redacting Personally Identifiable Information (SSNs, phone numbers) before data reaches models or users.",
                  "Hiding the computer monitor from coworkers.",
                  "Encrypting passwords in a local browser cookie.",
                  "Changing user profile pictures to avatars."
                ],
                correctIndex: 0,
                explanation: "Automated PII masking prevents sensitive personal data leakage across model prompts and logs."
              },
              {
                id: "q10_9",
                question: "How does setting a 'Stop Sequence' parameter influence model generation?",
                options: [
                  "It tells the model to immediately halt generation when it emits a specified text string (e.g. 'Human:' or '</html>').",
                  "It stops the server power supply.",
                  "It deletes user history.",
                  "It turns off the web browser."
                ],
                correctIndex: 0,
                explanation: "Stop sequences terminate generation as soon as specified boundary tokens are emitted, preventing model runaway."
              },
              {
                id: "q10_10",
                question: "What is the benefit of 'Structured Output Formatting' (JSON Mode / Schema Validation) in API integrations?",
                options: [
                  "Ensuring the output strictly matches expected JSON schemas for deterministic software parsing.",
                  "Making text look colorful in text editors.",
                  "Encrypting network packets.",
                  "Reducing GPU power consumption."
                ],
                correctIndex: 0,
                explanation: "Schema validation guarantees downstream code can safely deserialize model responses without syntax parsing crashes."
              }
            ]
          },
          {
            id: "c10_chest",
            title: "Advanced Mastery Chest",
            subtitle: "Bonus XP & Gems for Level 3",
            provider: "Bonus",
            type: "chest",
            xpReward: 40,
            durationMinutes: 1,
            iconName: "Gift",
            conceptSummary: "Claim bonus rewards as you reach advanced practical prompt engineering!",
            keyTopics: ["Level 3 Milestone", "Bonus Gems"]
          }
        ]
      },
      {
        id: "ch11",
        number: 11,
        title: "11. Google Prompting Essentials",
        description: "Learn Google’s structured task-context-reference-evaluate-iterate framework.",
        color: "purple",
        accentGradient: "from-purple-500 to-pink-600",
        nodes: [
          {
            id: "c11_google_prompting_essentials",
            title: "Google Prompting Essentials",
            subtitle: "Google & Coursera",
            provider: "Google",
            externalUrl: "https://www.coursera.org/specializations/prompting-essentials-google",
            type: "concept",
            xpReward: 50,
            durationMinutes: 90,
            iconName: "Sparkles",
            conceptSummary: "Master Google's 5-step prompting formula: Task, Context, Reference Material, Evaluate, and Iterate. Design prompts for data analysis, communication, and creative projects.",
            keyTopics: ["Google 5-Step Formula (Task, Context, Reference, Evaluate, Iterate)", "Context Ingestion", "Iterative Refinement"],
            fallbackQuestions: [
              {
                id: "q11_1",
                question: "In Google's 5-step prompting framework, what is the role of providing 'Reference Material'?",
                options: [
                  "Supplying specific source documents, style guides, or data samples for the AI to base its response on directly.",
                  "Adding external URL links that the browser downloads.",
                  "Changing the language setting of your operating system.",
                  "Generating random noise numbers for model seeds."
                ],
                correctIndex: 0,
                explanation: "Reference material grounds the model's output in your exact context, tone, or tabular data, minimizing speculation."
              },
              {
                id: "q11_2",
                question: "What is Step 1 ('Define the Task') in Google's 5-Step Prompting Formula?",
                options: [
                  "Clearly stating the specific action verb and goal (e.g. 'Summarize', 'Analyze', 'Draft an email').",
                  "Setting GPU clock speed.",
                  "Downloading Python packages.",
                  "Deleting browser cache files."
                ],
                correctIndex: 0,
                explanation: "Defining the task with strong action verbs provides the core command driving the generation."
              },
              {
                id: "q11_3",
                question: "In Google's prompting methodology, what does Step 2 ('Provide Context') accomplish?",
                options: [
                  "Explaining the background situation, target audience, tone preferences, and operational constraints.",
                  "Connecting to a local database.",
                  "Formatting text using HTML tags.",
                  "Running a ping test on local network routers."
                ],
                correctIndex: 0,
                explanation: "Context grounds the model in who the output is for and the environment in which it will be delivered."
              },
              {
                id: "q11_4",
                question: "Why is Step 4 ('Evaluate Output') necessary before deploying or sharing generated content?",
                options: [
                  "Checking the response for accuracy, tone alignment, missing requirements, and potential hallucinations.",
                  "Printing out paper copies of the text.",
                  "Changing the font color from black to dark blue.",
                  "Compressing the text file into a zip archive."
                ],
                correctIndex: 0,
                explanation: "Evaluation ensures human oversight and quality control before publishing or taking action based on AI suggestions."
              },
              {
                id: "q11_5",
                question: "What is Step 5 ('Iterate & Refine') in Google's prompting process?",
                options: [
                  "Adjusting parameters, adding missing constraints, or providing feedback to hone the output closer to perfection.",
                  "Shutting down the computer.",
                  "Deleting the original project repository.",
                  "Changing keyboard language settings."
                ],
                correctIndex: 0,
                explanation: "Prompting is an iterative feedback conversation where successive turns sharpen output quality."
              },
              {
                id: "q11_6",
                question: "How can Google AI Gemini assist in tabular Data Analysis tasks?",
                options: [
                  "By analyzing uploaded CSV/spreadsheet data, identifying statistical anomalies, and generating chart visual summaries.",
                  "By fixing broken physical laptop screens.",
                  "By formatting floppy disks.",
                  "By translating Morse code."
                ],
                correctIndex: 0,
                explanation: "Gemini can process structured data tables directly to generate summary insights, trends, and Python data code."
              },
              {
                id: "q11_7",
                question: "What is the primary benefit of assigning a 'Tone & Voice' parameter in Google Gemini prompts?",
                options: [
                  "Ensuring communications match organizational brand standards (e.g. 'Executive & Empathetic' vs 'Casual & Concise').",
                  "Speeding up model response latency by 2x.",
                  "Translating text into audio files.",
                  "Bypassing firewall security rules."
                ],
                correctIndex: 0,
                explanation: "Tone constraints align prose style with specific professional or audience communication channels."
              },
              {
                id: "q11_8",
                question: "When using Google Gemini for email drafting, why specify the 'Target Audience'?",
                options: [
                  "So the model adjusts vocabulary, technical depth, and formality appropriately for the intended recipients.",
                  "To send the email automatically without review.",
                  "To check the recipient's password.",
                  "To block spam emails."
                ],
                correctIndex: 0,
                explanation: "Audience targeting tailors jargon, reading level, and persuasiveness to executive, customer, or technical readers."
              },
              {
                id: "q11_9",
                question: "What is 'Multi-Modal Prompting' in modern Google Gemini models?",
                options: [
                  "Combining text, images, video, and audio inputs simultaneously within a single prompt context.",
                  "Using multiple computer monitors at once.",
                  "Running 5 operating systems in virtual machines.",
                  "Typing with both hands on a keyboard."
                ],
                correctIndex: 0,
                explanation: "Native multi-modality lets Gemini reason across visual diagrams, audio clips, and text context in unified turns."
              },
              {
                id: "q11_10",
                question: "How does providing 'Negative Examples' (examples of what NOT to do) refine Gemini responses?",
                options: [
                  "It explicitly warns the model away from common bad habits, anti-patterns, or incorrect formatting.",
                  "It causes the model to generate blank responses.",
                  "It locks the user account.",
                  "It turns on dark mode in the web app."
                ],
                correctIndex: 0,
                explanation: "Negative examples establish anti-patterns to steer model generation away from frequent mistakes."
              }
            ]
          }
        ]
      },
      {
        id: "ch12",
        number: 12,
        title: "12. Vanderbilt Prompt Engineering for ChatGPT",
        description: "Study advanced prompt patterns, few-shot prompting, complex prompt interactions, and reusable prompt-based applications.",
        color: "purple",
        accentGradient: "from-purple-500 to-pink-600",
        nodes: [
          {
            id: "c12_vanderbilt_prompt_engineering",
            title: "Vanderbilt Prompt Engineering for ChatGPT",
            subtitle: "Vanderbilt University & Coursera",
            provider: "Vanderbilt University",
            externalUrl: "https://www.coursera.org/learn/prompt-engineering",
            type: "boss",
            xpReward: 60,
            durationMinutes: 120,
            iconName: "Crown",
            conceptSummary: "Master advanced prompt design patterns: Persona Pattern, Question Refinement Pattern, Cognitive Verifier Pattern, Template Pattern, and Meta Language Creation for reusable AI apps.",
            keyTopics: ["Persona & Template Patterns", "Cognitive Verifier Pattern", "Meta Language & Reusable AI Apps"],
            fallbackQuestions: [
              {
                id: "q12_1",
                question: "How does the 'Cognitive Verifier Pattern' improve complex prompt performance?",
                options: [
                  "The model automatically generates sub-questions to ask itself, answers each sub-question, and uses those answers to construct the final answer.",
                  "It runs a virus scan on the text string.",
                  "It forces the model to reply in ancient Latin.",
                  "It limits the prompt length to fewer than 5 words."
                ],
                correctIndex: 0,
                explanation: "The Cognitive Verifier pattern breaks down ambiguous questions into explicit sub-verification questions, ensuring thorough analytical coverage."
              },
              {
                id: "q12_2",
                question: "What is the 'Question Refinement Pattern' introduced by Dr. Jules White (Vanderbilt)?",
                options: [
                  "Asking the model: 'Whenever I ask a question, suggest a better version of the question and ask if I would prefer to answer that instead.'",
                  "Refining software compilers to remove whitespace.",
                  "Deleting user questions after submission.",
                  "Translating user questions into binary bits."
                ],
                correctIndex: 0,
                explanation: "Question Refinement helps users uncover better prompts by leveraging the model's domain meta-knowledge to refine their query."
              },
              {
                id: "q12_3",
                question: "In Vanderbilt's catalog of prompt patterns, what is the 'Flipped Interaction Pattern'?",
                options: [
                  "Instructing the model to ask the user questions until it has enough information to achieve a specific goal.",
                  "Flipping the screen display upside down.",
                  "Reversing text word order from right to left.",
                  "Inverting image pixel colors."
                ],
                correctIndex: 0,
                explanation: "The Flipped Interaction pattern puts the AI in the interviewer role, systematically gathering necessary inputs."
              },
              {
                id: "q12_4",
                question: "What defines the 'Persona Pattern' in prompt engineering?",
                options: [
                  "Instructing the AI to act as a specific persona (e.g. 'Act as a Linux Terminal' or 'Act as a Patent Attorney') to condition outputs.",
                  "Creating fake social media accounts.",
                  "Generating user avatars in Photoshop.",
                  "Changing the font size of headings."
                ],
                correctIndex: 0,
                explanation: "Persona pattern sets perspective and technical depth constraints by adopting a tailored professional role."
              },
              {
                id: "q12_5",
                question: "What is the 'Template Pattern' used for in repeatable prompt automation?",
                options: [
                  "Defining exact placeholder syntax (e.g. [Insert Title Here]) that the model must preserve and populate without altering surround markup.",
                  "Creating paper resume templates.",
                  "Setting HTML CSS grid column counts.",
                  "Downloading website themes."
                ],
                correctIndex: 0,
                explanation: "Template patterns guarantee consistent structural formatting for automated document generation and report templates."
              },
              {
                id: "q12_6",
                question: "What is 'Meta Language Creation Pattern' in advanced prompting?",
                options: [
                  "Defining a shorthand custom syntax or notation (e.g. 'A -> B means summarize A into bullet points B') for efficient command interaction.",
                  "Inventing a new spoken human language.",
                  "Writing assembly code for microcontrollers.",
                  "Translating English into Esperanto."
                ],
                correctIndex: 0,
                explanation: "Meta Language pattern establishes custom domain shorthand, allowing dense user instructions without verbose repetition."
              },
              {
                id: "q12_7",
                question: "How does the 'Alternative Approaches Pattern' broaden problem-solving options?",
                options: [
                  "Asking the model: 'Whenever I ask you to do X, list alternative approaches to achieve X and compare their pros and cons.'",
                  "Forcing the model to fail on purpose.",
                  "Deleting all code comments.",
                  "Switching operating systems automatically."
                ],
                correctIndex: 0,
                explanation: "Alternative Approaches pattern prevents premature convergence on a single suboptimal solution by surfacing trade-offs."
              },
              {
                id: "q12_8",
                question: "What is the 'Fact Check List Pattern' for mitigating AI hallucinations?",
                options: [
                  "Instructing the model to output a list of key facts in its answer that the user should independently verify.",
                  "Creating a grocery shopping list.",
                  "Deleting facts from Wikipedia articles.",
                  "Formatting text as numbered lists only."
                ],
                correctIndex: 0,
                explanation: "Fact Check List pattern isolates specific empirical claims for targeted human validation."
              },
              {
                id: "q12_9",
                question: "What is the 'Audience Persona Pattern' in document adaptation?",
                options: [
                  "Explaining the same core topic adapted specifically for different reader archetypes (e.g. 'Explain quantum computing to a 10-year-old vs a PhD').",
                  "Counting the total number of people in an audience.",
                  "Muting microphone audio in video calls.",
                  "Formatting text using bold fonts."
                ],
                correctIndex: 0,
                explanation: "Audience Persona pattern tailors conceptual complexity, analogies, and technical vocabulary to specific recipient backgrounds."
              },
              {
                id: "q12_10",
                question: "What is the 'Infinite Loop Prevention / Game Terminal Pattern'?",
                options: [
                  "Configuring stateful text-adventure or simulator environments where the AI maintains state and waits for user input after every state change.",
                  "Causing an infinite loop in JavaScript code.",
                  "Shutting down local Wi-Fi networks.",
                  "Clearing browser local storage keys."
                ],
                correctIndex: 0,
                explanation: "Stateful game/terminal patterns dictate turn-taking behavior and state persistence in interactive prompts."
              }
            ]
          }
        ]
      }
    ]
  }
];

export const ORDERED_NODE_IDS: string[] = [
  "c1_google_genai",
  "c1_chest",
  "c2_google_llm",
  "c3_ibm_genai",
  "c4_google_responsible_ai",
  "c5_anthropic_fluency",
  "c6_elements_ai",
  "c6_chest",
  "c7_deeplearning_genai_everyone",
  "c8_udacity_ai_fundamentals",
  "c9_deeplearning_prompting",
  "c10_aws_prompt_engineering",
  "c10_chest",
  "c11_google_prompting_essentials",
  "c12_vanderbilt_prompt_engineering"
];

/**
 * Checks if a specific node is unlocked given user progress.
 * A node is unlocked IF:
 * 1. It's the very first node ("c1_google_genai"), OR
 * 2. It has already been completed or claimed, OR
 * 3. The node immediately preceding it in ORDERED_NODE_IDS is completed/claimed.
 */
export function isNodeUnlocked(nodeId: string, progress: UserProgress): boolean {
  if (nodeId === "c1_google_genai") return true;

  // If already completed or chest opened
  if (progress.completedNodeIds[nodeId]) return true;
  if (progress.unlockedChestIds.includes(nodeId)) return true;

  const index = ORDERED_NODE_IDS.indexOf(nodeId);
  if (index <= 0) return true; // Default fallback if not found

  const prevNodeId = ORDERED_NODE_IDS[index - 1];
  const isPrevCompleted = !!progress.completedNodeIds[prevNodeId] || progress.unlockedChestIds.includes(prevNodeId);

  return isPrevCompleted;
}

/**
 * Dynamically computes all badges/achievements state based on current progress.
 */
export function calculateAchievements(progress: UserProgress): Achievement[] {
  // Count completed nodes in Level 1
  const level1NodeIds = ["c1_google_genai", "c2_google_llm", "c3_ibm_genai", "c4_google_responsible_ai", "c5_anthropic_fluency"];
  const level1Completed = level1NodeIds.filter(id => !!progress.completedNodeIds[id]).length;
  const level1Progress = Math.min(100, Math.round((level1Completed / level1NodeIds.length) * 100));

  // Count completed nodes in Level 2
  const level2NodeIds = ["c6_elements_ai", "c7_deeplearning_genai_everyone", "c8_udacity_ai_fundamentals", "c9_deeplearning_prompting"];
  const level2Completed = level2NodeIds.filter(id => !!progress.completedNodeIds[id]).length;
  const level2Progress = Math.min(100, Math.round((level2Completed / level2NodeIds.length) * 100));

  // Count completed nodes in Level 3
  const level3NodeIds = ["c10_aws_prompt_engineering", "c11_google_prompting_essentials", "c12_vanderbilt_prompt_engineering"];
  const level3Completed = level3NodeIds.filter(id => !!progress.completedNodeIds[id]).length;
  const level3Progress = Math.min(100, Math.round((level3Completed / level3NodeIds.length) * 100));

  const totalCompletedNodes = Object.keys(progress.completedNodeIds).length;
  const xpProgress = Math.min(100, Math.round((progress.xp / 500) * 100));
  const streakProgress = Math.min(100, Math.round((progress.streak / 3) * 100));

  return [
    {
      id: "ach_welcome",
      title: "AI Journey Begins",
      description: "Start your first course in the ordered AI curriculum",
      icon: "Rocket",
      unlocked: totalCompletedNodes > 0 || progress.xp > 0,
      progress: totalCompletedNodes > 0 || progress.xp > 0 ? 100 : 0,
      category: "mastery"
    },
    {
      id: "ach_level1",
      title: "Basics Mastery",
      description: "Complete all 5 courses in Level 1 (Google, IBM, Anthropic)",
      icon: "Crown",
      unlocked: level1Completed === level1NodeIds.length,
      progress: level1Progress,
      category: "mastery"
    },
    {
      id: "ach_level2",
      title: "Moderate AI Engineer",
      description: "Complete Elements of AI, DeepLearning.AI & Udacity",
      icon: "Zap",
      unlocked: level2Completed === level2NodeIds.length,
      progress: level2Progress,
      category: "mastery"
    },
    {
      id: "ach_level3",
      title: "Prompt Engineering Pro",
      description: "Master AWS, Google Prompting Essentials & Vanderbilt",
      icon: "Star",
      unlocked: level3Completed === level3NodeIds.length,
      progress: level3Progress,
      category: "mastery"
    },
    {
      id: "ach_streak_3",
      title: "Consistency Flame",
      description: "Maintain a 3-day learning streak",
      icon: "Flame",
      unlocked: progress.streak >= 3,
      progress: streakProgress,
      category: "streak"
    },
    {
      id: "ach_xp_500",
      title: "500 XP Legend",
      description: "Accumulate 500 total learning XP across courses",
      icon: "Bot",
      unlocked: progress.xp >= 500,
      progress: xpProgress,
      category: "xp"
    }
  ];
}

export const INITIAL_USER_PROGRESS: UserProgress = {
  userName: "ABEBE",
  userAvatar: "🎓",
  xp: 0,
  streak: 1,
  hearts: 5,
  gems: 0,
  dailyXpGoal: 50,
  todayXpEarned: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedNodeIds: {},
  unlockedChestIds: [],
  currentActiveNodeId: "c1_google_genai",
  unlockedLevelIds: [1, 2, 3],
  activityHistory: [
    { date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0], xp: 20 },
    { date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0], xp: 35 },
    { date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0], xp: 15 },
    { date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0], xp: 45 },
    { date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0], xp: 50 },
    { date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0], xp: 40 },
    { date: new Date().toISOString().split('T')[0], xp: 0 }
  ]
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach_welcome",
    title: "AI Journey Begins",
    description: "Start your first course in the ordered AI curriculum",
    icon: "Rocket",
    unlocked: true,
    progress: 100,
    category: "mastery"
  },
  {
    id: "ach_level1",
    title: "Basics Mastery",
    description: "Complete all 5 courses in Level 1 (Google, IBM, Anthropic)",
    icon: "Crown",
    unlocked: false,
    progress: 0,
    category: "mastery"
  },
  {
    id: "ach_level2",
    title: "Moderate AI Engineer",
    description: "Complete Elements of AI, DeepLearning.AI & Udacity",
    icon: "Zap",
    unlocked: false,
    progress: 0,
    category: "mastery"
  },
  {
    id: "ach_level3",
    title: "Prompt Engineering Pro",
    description: "Master AWS, Google Prompting Essentials & Vanderbilt",
    icon: "Star",
    unlocked: false,
    progress: 0,
    category: "mastery"
  },
  {
    id: "ach_streak_3",
    title: "Consistency Flame",
    description: "Maintain a 3-day learning streak",
    icon: "Flame",
    unlocked: false,
    progress: 33,
    category: "streak"
  },
  {
    id: "ach_xp_500",
    title: "500 XP Legend",
    description: "Accumulate 500 total learning XP across courses",
    icon: "Bot",
    unlocked: false,
    progress: 0,
    category: "xp"
  }
];
