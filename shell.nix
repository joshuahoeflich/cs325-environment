{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs-12_x
    (import ./nix/roswell.nix {})
  ];
  shellHook = ''
    if [ ! -d "$PWD"/node_modules ]; then
      npm install
    fi
  '';
}
