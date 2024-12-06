package main

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cloudfront"
)

func main() {
	lambda.Start(handler)
}

func handler(evt events.APIGatewayV2HTTPRequest) (events.APIGatewayProxyResponse, error) {
	var body map[string]string
	err := json.Unmarshal([]byte(evt.Body), &body)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: "Invalid request body"}, nil
	}
	path := body["path"]
	err = refreshCache(path)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: "Failed to refresh cache"}, nil
	}
	return events.APIGatewayProxyResponse{StatusCode: 200, Body: fmt.Sprintf("Invalidation created for %s", path)}, nil
}

func refreshCache(path string) error {
	sess := session.Must(session.NewSession())
	svc := cloudfront.New(sess)
	input := &cloudfront.CreateInvalidationInput{
		DistributionId: aws.String(os.Getenv("DISTRIBUTION_ID")),
		InvalidationBatch: &cloudfront.InvalidationBatch{
			CallerReference: aws.String(fmt.Sprintf("%d", time.Now().Unix())),
			Paths: &cloudfront.Paths{
				Quantity: aws.Int64(1),
				Items:    []*string{aws.String(path)},
			},
		},
	}
	_, err := svc.CreateInvalidation(input)
	return err
}
