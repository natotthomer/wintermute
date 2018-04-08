Sequel.migration do
  up do
    create_table(:users) do
      primary_key :id
      String :name, null: false
      String :password_digest, null: false
      String :password_salt, null: false
    end
  end

  down do
    drop_table(:users)
  end
end
