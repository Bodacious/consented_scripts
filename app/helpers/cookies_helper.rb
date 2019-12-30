# frozen_string_literal: true

module CookiesHelper

  # Creates a consented-template tag that is _only_ executed when the user has consented
  # to cookies. Useful for things like Google Analytics, Facebook analytics, etc.
  # See src/consented_scripts.coffee
  #
  # Returns String of HTML
  def consented_javascript_tag(content_or_options = {}, **options, &block)
    if block_given?
      content = capture(&block)
      options = content_or_options
    else
      content = content_or_options
      options = options
    end
    options[:data] ||= {}
    options[:data][:src] = options.delete(:src)
    options.deep_merge!(data: { require_consent: true }, type: "application/template")
    content_tag(:script, content, options)
  end

end
