{
  description = ''
    Teaweb, an NMT schedule manager.

    This flake adds `services.teaweb`, which compiles and runs a
    Teaweb server on the local machine. TLS is not supported out of
    the box; I use nginx with ACME for that.

    It *should* also set up a systemd timer to re-run the scraper
    every hour; unfortunately I haven't figured out the scraper's
    semantics.
  '';

  outputs = { self, nixpkgs }: {
    nixosModules.default = { pkgs, lib, config, ... }: {
      options = with lib; {
        services.teaweb = {
          enable = mkOption {
            description = ''
              Enable Teaweb, an NMT schedule manager.
            '';
            default = false;
          };

          listenAddress = mkOption {
            description = ''
              IP address to listen from. Should usually either be
              127.0.0.1 (only allow localhost connections) or 0.0.0.0
              (allow all connections).
            '';
            default = "127.0.0.1";
          };

          listenPort = mkOption {
            description = ''
              Port to listen from.
            '';
            default = 3000;
          };
        };
      };

      config =
        let
          svcCfg = config.services.teaweb;
        in
        lib.mkIf svcCfg.enable {
          # I haven't nailed down the build process for sveltekit yet;
          # for now, we'll build the program at runtime.
          systemd.services.teaweb = {
            description = "Teaweb NMT Scheduler";
            wantedBy = [ "multi-user.target" ];
            after = [ "network.target" ];

            script = ''
              set -x
              rm -rf /var/lib/teaweb
              cp -r ${./.} /var/lib/teaweb
              chmod -R u+w /var/lib/teaweb
              cd /var/lib/teaweb
              export PATH=${pkgs.nodejs}/bin:${pkgs.deno}/bin:/bin:$PATH
              npm i
              # npm run scrape
              cp ${./classtimes.example.json} src/routes/classes.json.gz/classtimes.json
              npm run build
              export HOST=${svcCfg.listenAddress}
              export PORT=${toString svcCfg.listenPort}
              node ./build
            '';
          };
        };
    };
  };
}
