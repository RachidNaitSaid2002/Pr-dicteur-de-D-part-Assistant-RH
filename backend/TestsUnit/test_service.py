from unittest.mock import patch, MagicMock
from backend.Services.gemini import gemini_func

@patch("backend.Services.gemini.InferenceClient")
def test_gemini_func_simple(mock_client_class):
    sample_data = {"Age": 30, "Education": 2}

    mock_client = MagicMock()
    mock_client_class.return_value = mock_client

    mock_response = MagicMock()
    mock_response.choices = [
        MagicMock(message=MagicMock(
            content='{"risk_assessment": "Test this function"}'
        ))
    ]
    mock_client.chat.completions.create.return_value = mock_response

    result = gemini_func(sample_data)

    assert isinstance(result, str)
    assert "risk_assessment" in result
