
import pandas as pd

df = pd.read_csv("data/prices.csv")

df["NVDA_Return"] = df["NVDA"].pct_change()

avg_return = df["NVDA_Return"].dropna().mean()

print(f"Average Daily Return: {avg_return:.2%}")
