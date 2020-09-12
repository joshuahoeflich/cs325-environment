{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-12_x
    git
    sbcl
  ];
  CS325_LISP_REPO = "https://gitlab.com/criesbeck/cs325.git";
  QUICKLISP_URL = "https://beta.quicklisp.org/quicklisp.lisp";
  shellHook = ''
    if [ ! -d "$PWD"/node_modules ]; then
      npm install
    fi
    export SBCL_PATH="$(command -v sbcl)"
  '';
}
