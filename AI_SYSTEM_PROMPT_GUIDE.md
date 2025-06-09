# AI System Prompt Configuration

## Overview

The AI chat system now uses a modular JSON-based configuration system for managing the AI assistant's knowledge base and behavior. This approach provides better maintainability, easier updates, and cleaner separation of data from code.

## File Structure

```
data/
├── ai-system-prompt.json  # AI configuration and knowledge base
```

## Configuration File: `ai-system-prompt.json`

### Structure Overview

The JSON file is organized into several key sections:

#### 1. **System Prompt Configuration**

```json
{
  "systemPrompt": {
    "role": "Core AI role definition",
    "personality": "Behavioral guidelines",
    "guidelines": ["Array of response guidelines"],
    "responseFormat": "Response length and format rules",
    "contactInfo": {
      "encourageContact": true,
      "contactMethods": ["available contact methods"],
      "businessInquiries": "How to handle business inquiries"
    }
  }
}
```

#### 2. **Professional Profile**

```json
{
  "professionalProfile": {
    "name": "Full name",
    "title": "Professional title",
    "experience": "Years of experience",
    "location": "Geographic location",
    "specialization": ["Array of specializations"],
    "summary": "Professional summary"
  }
}
```

#### 3. **Technical Skills**

```json
{
  "technicalSkills": {
    "frontendTechnologies": ["Frontend tech stack"],
    "backendTechnologies": ["Backend tech stack"],
    "databases": ["Database technologies"],
    "cloudAndDevOps": ["Cloud and DevOps tools"],
    "mobileAndOther": ["Mobile and other technologies"]
  }
}
```

#### 4. **Key Projects**

```json
{
  "keyProjects": [
    {
      "name": "Project name",
      "description": "Project description",
      "technologies": ["Technologies used"],
      "highlights": ["Key achievements/features"]
    }
  ]
}
```

#### 5. **Professional Experience**

```json
{
  "professionalExperience": {
    "currentRole": "Current position",
    "experienceHighlights": ["Key experience points"],
    "industryExperience": ["Industry domains"]
  }
}
```

#### 6. **Additional Sections**

- `education`: Educational background and continuous learning
- `achievements`: Professional accomplishments
- `workingStyle`: Work approach and principles
- `availabilityAndServices`: Current availability and services offered
- `commonQuestions`: Pre-defined responses for frequent questions

## Implementation

### API Integration

The API route (`/app/api/chat/route.js`) imports and processes the JSON data:

```javascript
// Import AI system prompt data
import aiPromptData from "../../../data/ai-system-prompt.json";

// Generate system prompt from JSON data
function generateSystemPrompt() {
  const {
    systemPrompt,
    professionalProfile,
    technicalSkills,
    keyProjects,
    professionalExperience,
    achievements,
    availabilityAndServices,
  } = aiPromptData;

  return `${systemPrompt.role}

PERSONALITY & GUIDELINES:
${systemPrompt.guidelines.map((guideline) => `- ${guideline}`).join("\n")}

PROFESSIONAL PROFILE:
- Name: ${professionalProfile.name}
- Title: ${professionalProfile.title}
...
`;
}
```

### Dynamic System Prompt Generation

The `generateSystemPrompt()` function:

1. **Imports** the JSON configuration
2. **Destructures** relevant sections
3. **Formats** the data into a comprehensive system prompt
4. **Returns** a structured prompt for the AI model

## Benefits

### 1. **Maintainability**

- Easy to update AI knowledge without code changes
- Clear separation of data and logic
- Version control friendly

### 2. **Flexibility**

- Add new sections without modifying API code
- Easy to customize AI behavior
- Support for different prompt strategies

### 3. **Scalability**

- Structured data format
- Easy to extend with new fields
- Supports complex data relationships

### 4. **Team Collaboration**

- Non-developers can update AI knowledge
- Clear data structure
- Documentation-friendly format

## Usage Examples

### Updating Professional Information

To update Rakesh's current role or experience:

```json
{
  "professionalProfile": {
    "title": "Senior Full Stack Developer", // Updated title
    "experience": "4+ years" // Updated experience
    // ... other fields
  }
}
```

### Adding New Technical Skills

To add new technologies:

```json
{
  "technicalSkills": {
    "frontendTechnologies": [
      "React.js",
      "Next.js",
      "Svelte" // New addition
      // ... existing technologies
    ]
  }
}
```

### Adding New Projects

To include a new project:

```json
{
  "keyProjects": [
    {
      "name": "New Enterprise Dashboard",
      "description": "Modern analytics dashboard for enterprise clients",
      "technologies": ["React.js", "D3.js", "Node.js", "PostgreSQL"],
      "highlights": [
        "Real-time analytics",
        "Interactive visualizations",
        "High performance"
      ]
    }
    // ... existing projects
  ]
}
```

## Best Practices

### 1. **Data Consistency**

- Maintain consistent formatting across sections
- Use arrays for lists and objects for structured data
- Keep descriptions concise but informative

### 2. **Regular Updates**

- Update skills and experience regularly
- Add new projects as they're completed
- Remove outdated information

### 3. **Testing Changes**

- Test AI responses after updates
- Ensure prompt generation works correctly
- Verify no JSON syntax errors

### 4. **Version Control**

- Commit changes with descriptive messages
- Review changes before deployment
- Keep backup of working configurations

## Common Questions Configuration

The `commonQuestions` section provides pre-defined responses for frequently asked questions:

```json
{
  "commonQuestions": {
    "experienceLevel": "Response about experience",
    "availability": "Response about current availability",
    "technologies": "Response about technology stack",
    "projectTypes": "Response about project types",
    "location": "Response about location and remote work"
  }
}
```

## Future Enhancements

### Potential Improvements

1. **Multi-language Support**: Add language-specific prompt sections
2. **Context Awareness**: Dynamic prompts based on user behavior
3. **A/B Testing**: Multiple prompt variations for testing
4. **Analytics Integration**: Track which prompts perform better
5. **External Data Sources**: Integration with LinkedIn, GitHub APIs

### Advanced Features

1. **Conditional Prompts**: Different prompts for different user types
2. **Time-based Content**: Automatic updates based on current projects
3. **Personalization**: Customized responses based on visitor interests
4. **Integration APIs**: Sync with CRM or project management tools

## Troubleshooting

### Common Issues

1. **JSON Syntax Errors**

   - Validate JSON format using online validators
   - Check for missing commas or brackets
   - Ensure proper string escaping

2. **Missing Data**

   - Verify all required fields are present
   - Check array structures
   - Ensure nested objects are properly formatted

3. **Prompt Generation Errors**
   - Test the `generateSystemPrompt()` function
   - Check for undefined values
   - Verify data structure matches expectations

### Debugging

To debug prompt generation:

1. **Console Logging**: Add console.log in `generateSystemPrompt()`
2. **API Testing**: Test the chat endpoint directly
3. **JSON Validation**: Validate the JSON file structure
4. **Error Monitoring**: Check server logs for errors

---

This JSON-based system provides a robust, maintainable solution for managing the AI assistant's knowledge base while keeping the codebase clean and focused on functionality.
