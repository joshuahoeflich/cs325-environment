# CS 325 Environment

This code automatically sets up the environment for CS 325 for Lisp and Mac OS users using [nix](https://nixos.org/), a purely functional package manager with an emphasis on reproducibility. Whether you use nix for everything already or you simply want to try something new and interesting, these instructions are for you. Here are the three steps:

1. Install `nix` onto your machine:

   curl -L https://nixos.org/nix/install | sh

Check [the official documentation](https://nixos.org/download.html) for further instructions.

2. Clone this repository onto your machine and `cd` into it.

3. Run:

   nix-shell

Tada! You're done. Everything is now set up.

## Commands

If you want to run the code critic on a bit of common lisp, do:

    ai critic $FILE_NAME

Where `$FILE_NAME` is the name of the file with the code you're working on. If you want the critic to give you feedback every time you change the file, do:

    ai critic $FILE_NAME --watch

If you want to get a common lisp REPL with all of the packages associated with the course, run:

    ai repl

From here, you can poke around the code that's available to you.

Want an IDE that's ready to rock-and-roll out of the box? No problem! Just run:

    ai edit

This will spawn an instance of Emacs in your terminal which is pre-configured to play nicely with Slime.

Finally, to bootstrap the project without doing anything else, run:

    ai setup

Running this is generally unnecessary, as the other commands should be smart enough to run it themselves when you don't have a working installation. If you tinker with the files in the `quicklisp` folder, however, and you want to get back to a known good state, `ai clean && ai setup` should do the trick.
