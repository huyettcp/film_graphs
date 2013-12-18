require 'spec_helper'

describe Movie do 
  it { should allow_value("Bad Santa").for(:title) }
  it { should allow_value(18000000).for(:budget) }
  it { should allow_value(70000000).for(:gross) }
  it { should allow_value(2003).for(:year) }
  
end