# AMEX Credit Default Prediction Project

##  Overview
This project focuses on predicting **customer credit default risk** using the **American Express (AmEx) Credit Default Dataset**.  
The objective is to build an end-to-end machine learning pipeline that helps identify customers who are likely to default on their credit payments.

This project demonstrates skills in **data analysis, feature engineering, model training, and evaluation** using real-world, large-scale financial data.

---

##  Problem Statement
Credit default prediction is a crucial task in the financial industry.  
Given historical customer transaction and behavioral data, the goal is to predict whether a customer will default (`1`) or not (`0`).

---

##  Dataset
- **Source:** American Express Credit Default Dataset  
- **Type:** Large-scale tabular data  
- **Target Variable:** `default` (binary classification)


---

##  Tech Stack
- **Python**
- **Pandas, NumPy**
- **Matplotlib, Seaborn**
- **Scikit-learn**
- **LightGBM**
- **Jupyter Notebook**
- **Git & GitHub**

---

## Data Preprocessing

The raw dataset contained a large number of anonymized customer behavioral and transaction features. The following preprocessing steps were performed:

* Handled missing values using appropriate imputation techniques.
* Removed redundant and low-information features.
* Encoded categorical variables where required.
* Performed feature scaling and normalization.
* Optimized memory usage for efficient model training on large-scale data.

---

## Feature Engineering

To improve predictive performance, several feature engineering techniques were applied:

* Aggregated customer-level statistics from historical records.
* Generated derived features capturing customer spending and payment behavior.
* Created trend-based and summary features.
* Selected high-impact features using feature importance analysis.

---

## Exploratory Data Analysis (EDA)

Exploratory analysis was conducted to better understand the dataset and identify patterns associated with customer defaults.

Key analyses included:

* Default vs Non-default class distribution.
* Missing value analysis.
* Feature correlation analysis.
* Distribution of numerical variables.
* Identification of high-risk customer segments.

---

## Model Development

Multiple machine learning models were evaluated for credit default prediction.

Models explored:

* Logistic Regression (Baseline)
* Random Forest
* XGBoost
* LightGBM

The final solution utilized **LightGBM** due to its superior performance on large-scale tabular datasets and ability to handle high-dimensional features efficiently.

---

## Model Evaluation

The model was evaluated using industry-standard classification metrics:

* ROC-AUC Score
* Accuracy
* Precision
* Recall
* F1 Score

### Final Performance

* ROC-AUC Score: **0.93**
* Significant improvement over the baseline Logistic Regression model.
* Robust performance on unseen validation data.

---

## Streamlit Application

An interactive Streamlit application was developed to demonstrate real-time credit default prediction.

Features:

* User-friendly interface.
* Real-time customer risk prediction.
* Interactive input fields for customer attributes.
* Instant model inference and result visualization.

---

## Project Structure

```text
AMEX_DEFAULT_PREDICTION_PROJECT
│
├── data/
├── notebooks/
│   └── analysis.ipynb
│
├── app.py
├── requirements.txt
├── README.md
└── screenshots/
```

---

## Key Results

* Built a scalable binary classification pipeline for credit default prediction.
* Engineered 40+ predictive features from customer behavioral data.
* Achieved a ROC-AUC score of 0.93 using LightGBM.
* Developed an interactive Streamlit application for real-time inference.
* Demonstrated the effectiveness of gradient boosting models for financial risk assessment.

---

## Future Enhancements

* Hyperparameter optimization using Optuna.
* Model explainability using SHAP.
* Deployment using Docker and Cloud Platforms.
* Automated retraining pipeline.
* Real-time data ingestion and monitoring.

```
```

