# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/activation_needed_email
  def activation_needed_email
    UserMailer.activation_needed_email
  end

  # Preview this email at http://localhost:3000/rails/mailers/user_mailer/activation_success_email
  def activation_success_email
    UserMailer.activation_success_email
  end

end
