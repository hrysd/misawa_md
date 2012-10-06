require 'crxmake'
require 'json'

NAME = 'misawa_md'

namespace :pkg do
  desc 'create zip for Google Extension Gallery'
  task :zip do
    package = "pkg/#{NAME}.zip"
    `rm #{package}` if File.exists?(package)
    CrxMake.zip(
      :ex_dir     => 'src',
      :pkey       => "#{NAME}.pem",
      :zip_output => package,
      :verbose    => true,
      :ignoredir  => /^\.git$/
    )
  end
end
