{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-12_x
    sbcl
  ];
  shellHook = ''
    if [ ! -d "$PWD"/node_modules ]; then
      npm install
    fi
    export SBCL_PATH="$(command -v sbcl)"
  '';
}
