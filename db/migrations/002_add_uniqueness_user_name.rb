Sequel.migration do
  up do
    alter_table(:users) do
      add_unique_constraint :name
    end
  end

end
