{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-12_x
    git
    sbcl
  ];
  CS325_LISP_REPO = "https://gitlab.com/criesbeck/cs325.git";
  CS325_JS_REPO = "https://gitlab.com/criesbeck/cs325-js.git";
  QUICKLISP_URL = "https://beta.quicklisp.org/quicklisp.lisp";
  shellHook = ''
    export SBCL_PATH="$(command -v sbcl)"
    export PATH="$PWD"/cli/bin:"$PATH"
    if [ ! -d "$PWD"/node_modules ]; then
      npm install
      ai setup
    fi
  '';
}
