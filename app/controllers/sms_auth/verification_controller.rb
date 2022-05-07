module SmsAuth
  class VerificationController < ApplicationController
    def new
      @verification = SmsVerification.new
    end

    def create
      @verification = SmsVerification.new(verification_params)
      if @verification.valid?
        if verify_pin(@verification) == 'approved'
          update_user_phone_and_role(session[:phone])
          flash[:alert] = "手機驗證成功"
          redirect_to users_path
        else
          flash[:alert] = '驗證碼無效'
          redirect_to new_sms_auth_verification_path
        end
      else
        render :new
      end
    end

    private
    def verify_pin(verification)
      account_sid = ENV['TWILIO_ACCOUNT_SID']
      auth_token = ENV['TWILIO_AUTH_TOKEN']
      services = ENV['TWILIO_SERVICES']
      @client = Twilio::REST::Client.new(account_sid, auth_token)
      verification_check = @client.verify
                                  .services(services)
                                  .verification_checks
                                  .create(to: session[:phone], code: verification.code)
      verification_check.status
    end

    def update_user_phone_and_role(phone)
      current_user.update!(phone: phone,role: "seller")
    end

    def verification_params
      params.require(:sms_verification).permit(:code, :cellphone)
    end
  end
end
