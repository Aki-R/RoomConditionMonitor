import pandas as pd
import datetime

url = 'https://docs.google.com/spreadsheets/d/11epdFQThZhdsYU8649myI3Nd9Q3LeQ8AGTbcdKiosek/export?gid=0&format=csv'
df = pd.read_csv(url, header=None, names=['Date', 'Time', 'Temperature', 'Humidity', 'Iluminance'])

# Date変換
df['DateTime'] = pd.to_datetime(df['Date'] + ' ' + df['Time'])
#Columnの入れ替えと不要な列の削除
df_mod = df.reindex(columns=['DateTime', 'Temperature', 'Humidity', 'Iluminance'])

print(df_mod)

fileout = open('html/wfirex_sensor.json', 'w')
#print(df_mod.to_json(orient='records', date_format='iso'), file=fileout)
print(df_mod.to_json(orient='records'), file=fileout)
fileout.close()
