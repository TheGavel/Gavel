module SmsAuth
  class RegistrationController < ApplicationController
    def new
      @registration = SmsRegistration.new
    end

    def create
      @registration = SmsRegistration.new(registration_params)
      if is_phone_exist?(@registration)
        flash[:alert] = '此手機號碼不合法'
        redirect_to new_sms_auth_registration_path
        return
      end
      if is_phone_exist_in_db?(@registration)
        flash[:alert] = '此手機號碼已註冊過了'
        redirect_to new_sms_auth_registration_path
        return
      end
      if @registration.valid?
        register_authy_user(@registration)
        cellphone = '+886'+@registration.cellphone[1..-1]
        redirect_to new_sms_auth_verification_path
      else
        flash.now[:alert] = '請確認手機號碼有效'
        render :new
      end
    end

    private
    def is_phone_exist?(registration)
      phone = '+886'+registration.cellphone[1..-1]
      uri = URI.encode('https://lookups.twilio.com/v2/PhoneNumbers/'+phone)
      uri = URI.parse(uri)
      request = Net::HTTP::Get.new(uri)
      request.basic_auth(ENV['TWILIO_ACCOUNT_SID'], ENV['TWILIO_AUTH_TOKEN'])
      req_options = {
        use_ssl: uri.scheme == "https",
      }
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end
      return response.body["valid"] != "valid"
    end

    def is_phone_exist_in_db?(registration)
      User.where(phone: '+886'+registration.cellphone[1..-1]).any?
    end

    def register_authy_user(registration)
      account_sid = ENV['TWILIO_ACCOUNT_SID']
      auth_token = ENV['TWILIO_AUTH_TOKEN']
      services = ENV['TWILIO_SERVICES']
      @client = Twilio::REST::Client.new(account_sid, auth_token)
      verification = @client.verify
                            .services(services)
                            .verifications
                            .create(to: '+886'+registration.cellphone[1..-1], channel: 'sms')
      session[:phone] = '+886'+registration.cellphone[1..-1]
    end

    def registration_params
      params.require(:sms_registration).permit(:cellphone).merge(email: current_user.email)
    end
  end
end
