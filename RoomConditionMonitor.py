import pandas as pd
import datetime

URL_CSV = 'https://docs.google.com/spreadsheets/d/xxxxxxxxxxxxxxxxxxxxxxx/export?gid=0&format=csv'
PATH_JSON = '/xxxxx/RoomConditionMonitor/html'

df = pd.read_csv(URL_CSV, header=None, names=['Date', 'Time', 'Temperature', 'Humidity', 'Iluminance'])

# Date変換
df['DateTime'] = pd.to_datetime(df['Date'] + ' ' + df['Time'])
#Columnの入れ替えと不要な列の削除
df_mod = df.reindex(columns=['DateTime', 'Temperature', 'Humidity', 'Iluminance'])

# ファイル出力
fileout = open(PATH_JSON, 'w')
print(df_mod.to_json(orient='records'), file=fileout)
fileout.close()
