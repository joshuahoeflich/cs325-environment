{ pkgs ? import <nixpkgs> {} }:

let
  rev = "48806d5fe7373e32ba1c9786c62f81315c98b902";
  sha256 = "0r2zcf0jlza6cn8xzm8hc8wdk55m9dfgk4jlv7liwhvivi1jb45y";
in
pkgs.stdenv.mkDerivation {
  name = "roswell";
  buildInputs = with pkgs; [
    cacert
    curl
    autoconf
    automake
  ];
  src = pkgs.fetchFromGitHub {
    name = "roswell";
    owner = "roswell";
    repo = "roswell";
    rev = rev;
    sha256 = sha256;
  };
  buildPhase = ''
    ./bootstrap
    ./configure --prefix $out
  '';
}
