require 'spec_helper'

describe Studio do
  it { should have_many(:movies) }
end
