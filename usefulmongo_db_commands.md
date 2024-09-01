1. **List all collections in the database:**

   ```bash
   echo 'show collections' | mongo files_manager
   ```

2. **Insert a document into a collection:**

   ```bash
   echo 'db.collection_name.insert({key: "value"})' | mongo files_manager
   ```

3. **Find all documents in a collection:**

   ```bash
   echo 'db.collection_name.find()' | mongo files_manager
   ```

4. **Count documents in a collection:**

   ```bash
   echo 'db.collection_name.countDocuments()' | mongo files_manager
   ```

5. **Update a document in a collection:**

   ```bash
   echo 'db.collection_name.update({query}, {$set: {key: "new_value"}})' | mongo files_manager
   ```

6. **Remove a document from a collection:**

   ```bash
   echo 'db.collection_name.remove({query})' | mongo files_manager
   ```

7. **Create an index on a collection:**

   ```bash
   echo 'db.collection_name.createIndex({key: 1})' | mongo files_manager
   ```

8. **Drop a specific collection:**

   ```bash
   echo 'db.collection_name.drop()' | mongo files_manager
   ```

9. **Get the database stats:**

   ```bash
   echo 'db.stats()' | mongo files_manager
   ```

10. **Get collection stats:**
    ```bash
    echo 'db.collection_name.stats()' | mongo files_manager
    ```

examples:

1. **List all collections in the database:**

   ```bash
   echo 'show collections' | mongo files_manager
   ```

2. **Insert a document into the `users` collection:**

   ```bash
   echo 'db.users.insert({username: "john_doe", email: "john@example.com"})' | mongo files_manager
   ```

3. **Find all documents in the `users` collection:**

   ```bash
   echo 'db.users.find()' | mongo files_manager
   ```

4. **Count documents in the `files` collection:**

   ```bash
   echo 'db.files.countDocuments()' | mongo files_manager
   ```

5. **Update a document in the `users` collection (e.g., change `email` for `john_doe`):**

   ```bash
   echo 'db.users.update({username: "john_doe"}, {$set: {email: "john.doe@example.com"}})' | mongo files_manager
   ```

6. **Remove a document from the `files` collection (e.g., remove a file with a specific `file_id`):**

   ```bash
   echo 'db.files.remove({file_id: "12345"})' | mongo files_manager
   ```

7. **Create an index on the `files` collection for `file_name`:**

   ```bash
   echo 'db.files.createIndex({file_name: 1})' | mongo files_manager
   ```

8. **Drop the `logs` collection:**

   ```bash
   echo 'db.logs.drop()' | mongo files_manager
   ```

9. **Get the database stats:**

   ```bash
   echo 'db.stats()' | mongo files_manager
   ```

10. **Get stats for the `files` collection:**
    ```bash
    echo 'db.files.stats()' | mongo files_manager
    ```

These commands with examples will help you perform common operations in your `files_manager` database.
