import streamlit as st
import lightgbm as lgb
import numpy as np
import pandas as pd
import os

st.set_page_config(
    page_title="AmEx Credit Default Predictor",
    page_icon="💳",
    layout="centered"
)

st.title("💳 AmEx Credit Default Predictor")
st.markdown("Enter customer financial details below to predict the likelihood of credit default.")
st.divider()

@st.cache_resource
def load_model():
    model_path = "lgbm_model.txt"
    if os.path.exists(model_path):
        model = lgb.Booster(model_file=model_path)
        return model
    return None

model = load_model()

if model is None:
    st.warning("Model file `lgbm_model.txt` not found. Running in demo mode with mock predictions.")

st.subheader("Customer Financial Profile")

col1, col2 = st.columns(2)

with col1:
    payment_amt = st.number_input("Last payment amount ($)", min_value=0.0, max_value=50000.0, value=500.0, step=50.0)
    balance = st.number_input("Current balance ($)", min_value=0.0, max_value=100000.0, value=3000.0, step=100.0)
    credit_limit = st.number_input("Credit limit ($)", min_value=500.0, max_value=100000.0, value=10000.0, step=500.0)
    min_payment = st.number_input("Minimum payment due ($)", min_value=0.0, max_value=5000.0, value=150.0, step=10.0)

with col2:
    months_on_book = st.slider("Months on book", min_value=1, max_value=120, value=24)
    missed_payments = st.slider("Missed payments (last 12 months)", min_value=0, max_value=12, value=0)
    credit_score = st.slider("Credit score", min_value=300, max_value=850, value=680)
    num_transactions = st.slider("Transactions (last 3 months)", min_value=0, max_value=100, value=20)

st.divider()

utilization = (balance / credit_limit) * 100 if credit_limit > 0 else 0
payment_ratio = (payment_amt / balance) * 100 if balance > 0 else 100

col_a, col_b, col_c = st.columns(3)
col_a.metric("Credit utilization", f"{utilization:.1f}%", delta=None)
col_b.metric("Payment ratio", f"{payment_ratio:.1f}%", delta=None)
col_c.metric("Risk flag", "High" if missed_payments >= 2 else "Low",
             delta="⚠️" if missed_payments >= 2 else "✓")

st.divider()

if st.button("Predict Default Risk", type="primary", use_container_width=True):
    features = np.array([[
        payment_amt, balance, credit_limit, min_payment,
        months_on_book, missed_payments, credit_score,
        num_transactions, utilization / 100, payment_ratio / 100
    ]])

    if model is not None:
        feature_names = model.feature_name()
        input_df = pd.DataFrame(features, columns=feature_names[:features.shape[1]])
        prob = model.predict(input_df)[0]
    else:
        # Demo mode: rule-based mock prediction
        risk_score = 0.0
        if utilization > 80: risk_score += 0.35
        elif utilization > 50: risk_score += 0.15
        if missed_payments >= 3: risk_score += 0.40
        elif missed_payments >= 1: risk_score += 0.20
        if credit_score < 580: risk_score += 0.25
        elif credit_score < 670: risk_score += 0.10
        if payment_ratio < 10: risk_score += 0.15
        prob = min(risk_score, 0.97)

    st.subheader("Prediction Result")

    if prob < 0.3:
        st.success(f"**Low default risk** — probability: {prob:.1%}")
        st.markdown("This customer profile shows strong repayment indicators. No immediate action required.")
    elif prob < 0.6:
        st.warning(f"**Medium default risk** — probability: {prob:.1%}")
        st.markdown("This customer shows some risk factors. Consider monitoring account activity closely.")
    else:
        st.error(f"**High default risk** — probability: {prob:.1%}")
        st.markdown("This customer profile has significant default risk indicators. Recommend review.")

    st.progress(float(prob), text=f"Default probability: {prob:.1%}")

st.divider()
st.caption("Built with LightGBM · Streamlit · Docker | AmEx Credit Default Dataset | github.com/vaishnavibodla")
