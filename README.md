# CS 325 Environment

This code automatically sets up the environment for CS 325 for Linux and Mac OS users using [nix](https://nixos.org/), a purely functional package manager with an emphasis on reproducibility. It uses `sbcl` to handle common lisp. Windows isn't supported yet, at least not officially; it _might_ be possible to get everything working using the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10), but further testing is required.

Whether you use nix for everything already or you simply want to try something new and interesting, these instructions are for you. Here are the three steps:

1. Install `nix` onto your machine:

   `curl -L https://nixos.org/nix/install | sh`

Check [the official documentation](https://nixos.org/download.html) for further instructions.

2. Clone this repository onto your machine and `cd` into it.

3. Run `nix-shell` in the directory you entered in the last step.

Tada! You're done. Everything is now set up.

## Commands

If you want to run tests for a particular exercise, create a file named `$EXERCISE_NAME.lisp` and run `ai test $EXAMPLE_NAME.lisp` in your terminal. If you want to run the tests in watch mode,

    ai test $EXAMPLE.lisp --watch

Should do the trick.

If you want to run the code critic on a bit of common lisp, do:

    ai critic $FILE_NAME

Where `$FILE_NAME` is the name of the file with the code you're working on. If you want the critic to give you feedback every time you change that file, do:

    ai critic $FILE_NAME --watch

If you want to get a common lisp REPL with all of the packages associated with the course, run:

    ai repl

From here, you can poke around the code to your hearts content.

Finally, to bootstrap this project without doing anything else, run:

    ai setup

Running this is generally unnecessary, as the other commands should be smart enough to run it themselves when you don't have a working installation. If you tinker with the files in the `quicklisp` folder, however, and you want to get back to a known good state, `ai clean && ai setup` should do the trick.

Additional features might be coming soon; a roadmap exists in the file `TODO.md`. Pull requests are welcome. If you have any questions or concerns, feel free to reach out to me on Piazza or submit an issue right here on GitHub. Thank you very much!
