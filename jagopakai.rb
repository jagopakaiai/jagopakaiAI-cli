class Jagopakai < Formula
  desc "JagoPakaiAI CLI rules configuration manager"
  homepage "https://github.com/jagopakaiai/jagopakaiAI-cli"
  url "https://github.com/jagopakaiai/jagopakaiAI-cli/releases/latest/download/jagopakai-macos-x64"
  version "1.0.0"
  sha256 "replace-with-checksum-during-release"

  def install
    if Hardware::CPU.intel?
      bin.install "jagopakai-macos-x64" => "jagopakai"
    else
      bin.install "jagopakai-macos-arm64" => "jagopakai"
    end
  end

  test do
    system "#{bin}/jagopakai", "--version"
  end
end
