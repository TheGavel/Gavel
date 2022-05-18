# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: ENV['USER_MAILGUN_ADDRESS']
  layout 'mailer'
end
