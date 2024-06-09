export const recordHistory = async (honoCtxEnv, englishName, japaneseName, tableName, ipAddress, now) => {
  const query = `INSERT INTO histories (english_name, japanese_name, table_name, ip_address, updated_at) VALUES (?, ?, ?, ?, ?)`
  await honoCtxEnv.prepare(query)
            .bind(englishName, japaneseName, tableName, ipAddress, now)
            .run()
}
