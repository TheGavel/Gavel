require 'rails_helper'

RSpec.describe Product, type: :model do
  let(:product) { create(:product) }
  describe 'Validation' do
    it "Product is valid" do
      expect(product).to be_valid
    end

    context "Name validation" do
      it 'Can not be nil' do
        product.name = nil
        expect(product).not_to be_valid
      end
    end

    context "Description validation" do
      it 'Can not be nil' do
        product.description = nil
        expect(product).not_to be_valid
      end

      it 'Length can not less than 10' do
        product.description = "我只有九個字在這裡"
        expect(product).not_to be_valid
      end
    end

    context "Description validation" do
      it 'Can not be nil' do
        product.description = nil
        expect(product).not_to be_valid
      end

      it 'Length can not less than 10' do
        product.description = "我只有九個字在這裡"
        expect(product).not_to be_valid
      end
    end

    context "Start price validation" do
      it 'Can not be nil' do
        product.start_price = nil
        expect(product).not_to be_valid
      end

      it 'Must greater than 0' do
        product.start_price = 0
        expect(product).not_to be_valid
      end

      it 'Must be integer' do
        product.start_price = "string here"
        expect(product).not_to be_valid
      end
    end

    context "Basic price validation" do
      it 'Can not be nil' do
        product.basicprice = nil
        expect(product).not_to be_valid
      end

      it 'Must greater than 0' do
        product.basicprice = -1
        p product
        expect(product).not_to be_valid
      end

      it 'Must be integer' do
        product.basicprice = "string here"
        expect(product).not_to be_valid
      end
    end
  end
end
