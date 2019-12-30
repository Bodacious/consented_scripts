# ConsentedScripts

A simple Javascript pack for managing user consent to cookies.

If your site distinguishes between necessary and optional cookies, this pack
will help you mark certain scripts as "consent only". This means that services
such as Google Analytics and Facebook Pixels can be loaded on a consented basis.

## Installation

### Yarn Installation

Add the JS package by running the following command in the command line:

```
yarn add consented_scripts
```

And then include it in your file:

``` javascript
let ConsentedScripts = require("consented_scripts");
```

### Rails Installation

The main bulk of this library is in the Javascript, but you can install the gem
to your Rails app for a helpful view helper.

Add this line to your application's Gemfile:

```ruby
gem 'consented_scripts'
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install consented_scripts

## Usage

### JS Usage


### Rails Usage

Do the above, but also...

## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/consented_scripts.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
