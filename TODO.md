## Features Possibly Coming Soon™

- [ ] **Git Integration**: Modify `ai setup` to:
  - Delete the remote origin which points to this GitHub repository.
  - Delete the `.git` folders in `quicklisp/local-projects/` and `js`
  - Modify the git hooks in the `package.json` file to run `ai critic` and `ai test` on every lisp file per commit.
  - Modify the gitignore file to not ignore the `js` folder.
  - Create an empty folder called `src` in which to put your code.

These changes will let you track all of your work for the course with a `git` setup that enforces code quality on every commit.

- [ ] **Editor Integration**: Add an `ai edit` command that will open up an instance of Emacs in your shell which is pre-configured to work nicely with Common Lisp out of the box.
- [ ] **Critic Integration**: Add:
  - An `ai login` command which authenticates you with the critic.
  - An `ai submit` command which lets you submit the code in a file for a particular exercise.
  - An `ai stats` command which lets you track your progress throughout the quarter.
