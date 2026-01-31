# Skill: commit

Generate conventional commit messages for staged changes.

## Usage

`/commit [options]`

Options:
- `-a` or `--amend`: Amend the last commit
- `-m "message"`: Use provided message as hint

## Instructions

1. Run `git status` and `git diff --cached` to understand staged changes
2. Analyze the changes and categorize them:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, etc.)
   - `refactor`: Code refactoring
   - `perf`: Performance improvements
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks
   - `ci`: CI/CD changes
   - `build`: Build system changes

3. Generate a commit message following this format:
   ```
   <type>(<scope>): <short description>

   [optional body]

   [optional footer]
   ```

4. The scope should be relevant to this project:
   - `ui`: UI components
   - `api`: API routes
   - `ml`: Machine learning/ONNX related
   - `i18n`: Internationalization
   - `auth`: Authentication
   - `canvas`: Konva/Canvas related
   - `config`: Configuration

5. Ask user to confirm before committing
6. Execute the commit with the agreed message

## Example Output

```
feat(ui): add responsive mobile navigation

- Add MobileBottomNav component
- Update layout to include bottom nav on mobile
- Improve touch targets for better accessibility

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```
