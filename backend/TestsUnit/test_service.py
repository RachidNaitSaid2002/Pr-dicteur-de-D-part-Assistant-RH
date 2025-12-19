
from unittest.mock import patch, MagicMock
from backend.Services.gemini import gemini_func  

def test_gemini_func_simple():
    sample_data = {"Age": 30, "Education": 2}

    with patch("backend.Services.gemini.InferenceClient") as mock_client_class:
        mock_client = MagicMock()
        mock_client_class.return_value = mock_client

        mock_response = MagicMock()
        mock_response.choices = [MagicMock(message=MagicMock(content='{"risk_assessment": "Test this function"}'))]
        mock_client.chat.completions.create.return_value = mock_response

        result = gemini_func(sample_data)

        assert isinstance(result, str)
        assert "risk_assessment" in result
