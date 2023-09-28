{
  description = "Hackyeah project";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
  };

  outputs = { self, nixpkgs, flake-utils, pre-commit-hooks }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        dev-go-script = pkgs.writeShellScriptBin "dev-back"
          ''
            PROJECT_DIR=$(echo "$DIRENV_DIR" | cut -c 2-)
            cd "$PROJECT_DIR:=./backend" || return
            reflex -r '\.go$' -s -- go run .
          '';
      in
      {
        check = {
          pre-commit-check = pre-commit-hooks.lib.${system}.run {
            src = ./.;
            hooks = {
              nixpkgs-fmt.enable = true;
              shellcheck.enable = true;
              eslint.enable = true;
              gofmt.enable = true;
            };
          };
        };

        devShell = pkgs.mkShell {
          shellHook = ''
            ${self.check.${system}.pre-commit-check.shellHook}

            printf "\e[33m
            Let's begin coding 😎
            run \e[1mdev-back\e[0m\e[33m -> to develop backend
            run \e[1mcd frontend; bun install; bun run dev\e[0m\e[33m -> to develop frontend
            \e[0m
            "
          '';

          buildInputs = with pkgs; [
            bun
            reflex
            go
          ] ++ [
            dev-go-script
            # dev-front-script
          ];
        };
      }
    );
}
