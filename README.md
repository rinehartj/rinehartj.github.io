# rinehartj.github.io

I was receiving the following error. Fixed by changing `remoteUser` from **vscode** to **root** in devcontainer.json

```plaintext
Failed to setup the bundle: Command failed: gem install ruby-lsp --env-shebang ERROR: While executing gem ... (Gem::FilePermissionError) You don't have write permissions for the /usr/local/bundle/gems/language_server-protocol-3.17.0.6 directory. /usr/local/lib/ruby/site_ruby/3.4.0/rubygems/installer.rb:308:in 'Gem::Installer#install' /usr/local/lib/ruby/site_ruby/3.4.0/rubygems/resolver/specification.rb:105:in 'Gem::Resolver::Specification#install' /usr/local/lib/ruby/site_ruby/3.4.0/rubygems/request_set.rb:192:in 'block in Gem::RequestSet#install' /usr/local/lib/ruby/site_ruby/3.4.0/rubygems/request_set.rb:183:in 'Array#each' /usr/local/lib/ruby/site_ruby/3.4.0/rubygems/request_set.rb:183:in 'Gem::RequestSet#install' /usr/local/lib/ruby/site_ruby/3.4.0/rubygems/commands/install_command.rb:207:in 'Gem::Commands::InstallCommand#install_gem' /usr/local/lib/ruby/site_ruby/3.4.0/rubygems/commands/install_command.rb:223:in 'block in Gem::Commands::InstallCommand#install_gems' /...
```

Reopen in container **without** cache in VSCode if the container hangs.

Moved posts, projects, _3dportfolio pages, assets, _bibliography/papers.bib, _data, _pages, bin/process-images.sh, 3d_portfilio.md

Moved _layouts/3d_model.liquid
Moved _includes/3d_portfolio.liquid

Carried over values from _config.yml